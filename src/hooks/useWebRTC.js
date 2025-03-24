import React, { useCallback, useEffect, useRef } from "react";
import useStateWithFallback from "./useStateWithFallback";
import socketInit from "../socket";
import ACTIONS from "../actions";
import freeice from "freeice";

// const users = [
//   { id: 1, name: "Hello" },
//   { id: 2, name: "Hello 2" },
// ];

const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithFallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketInit();
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  //extra checks
  // cb mean call back fn
  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor === undefined) {
        setClients((exsitingClient) => [...exsitingClient, newClient], cb);
      }
    },
    [clients, setClients]
  );

  //Capture the audio media

  useEffect(() => {
    const startCapture = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startCapture().then(() => {
      addNewClient(user, () => {
        const audioElement = audioElements.current[user?.id];
        if (audioElement) {
          audioElement.volume = 0;
          audioElement.srcObject = localMediaStream.current;
        }

        //Socket logic

        socketRef.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    return () => {
      //Leaving logic
    }
  }, []);


  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      //if already connected then give a warning
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected ${peerId} ${user?.name}`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });


      //handle new ice candidate
      connections.current[peerId].onicecandidate = (event) => {
        socketRef.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };


      //hanlde on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {

          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;

          } else {

            let settled = false;
            const interval = setInterval(() => {

              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              };

              if (settled) {
                clearInterval(interval)
              }

            }, 1000);
          }
        });
      };

      //add local track to remote connection
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current)
      });

      //create offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();

        //send offer to another client;
        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer
        })
      }

    };

    socketRef.current.on(ACTIONS.ADD_PEER, handleNewPeer);


    //clear function 
    return () => {
      socketRef.current.off(ACTIONS.ADD_PEER)
    }

  }, []);


  // handle ice candidate
  useEffect(() => {
    socketRef.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate)
      }
    });


    return () => {
      socketRef.current.off(ACTIONS.ICE_CANDIDATE);
    }

  }, [])


  //hanlde sdp
  useEffect(() => {

    const handleRemoteSDP = async ({ peerId, sessionDescription: remoteSessionDescription }) => {
      if (remoteSessionDescription) {
        connections.current[peerId].setRemoteDescription(
          new RTCSessionDescription(remoteSessionDescription)
        )
      };

      //if session description is type of offer then create an answer;
      if(remoteSessionDescription.type === 'offer'){
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer
        })
      };

    };

    socketRef.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);

    return () => {
      socketRef.current.off(ACTIONS.SESSION_DESCRIPTION)
    }
  }, [])


  //handle remove peer
  useEffect(() => {

    const handleRemovePeer = async({peerId, userId}) => {
      if(connections.current[peerId]){
        connections.current[peerId].close();
      };

      delete connections.current[peerId];
      delete audioElements.current[peerId];
      setClients((clientList) => clientList.filter(singelClient => singelClient.id !== userId))
    };

    socketRef.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socketRef.current.off(ACTIONS.REMOVE_PEER);
    }
  },[])

  return { clients, provideRef };
};

export default useWebRTC;

/* 

01: 

const provideRef = (instance, userId) => {
  if (instance) {
    audioElements.current[userId] = instance;
  } else {
    delete audioElements.current[userId]; // Remove null values
  }
};




02: 

useEffect(() => {
  const startCapture = async () => {
    try {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  startCapture();

  return () => {
    if (localMediaStream.current) {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      console.log("Audio stream stopped");
    }
  };
}, []);



03: Problem=>

useCallback remembers the old state of clients.

If clients is updated, this function might still use the old value and fail to add a new client.

🔹 Fix: Use an updater function inside setClients.

This ensures that React always uses the latest state when updating clients:

================
const addNewClient = useCallback(
  (newClient, cb) => {
    setClients((existingClients) => {
      const lookingFor = existingClients.find((client) => client.id === newClient.id);
      if (!lookingFor) {
        return [...existingClients, newClient];
      }
      return existingClients;
    }, cb);
  },
  [setClients] // ✅ Remove `clients` from dependency array
);

===================


04: Problem=>

useEffect runs every time user or addNewClient changes.

This means the app keeps requesting microphone access repeatedly.

This could lead to microphone permission pop-ups appearing multiple times or audio issues.

🔹 Fix: Only request microphone access once when the component mounts:
===========

useEffect(() => {
  const startCapture = async () => {
    if (!localMediaStream.current) { // ✅ Prevent multiple requests
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    }
  };

  startCapture().then(() => {
    addNewClient(user, () => {
      const audioElement = audioElements.current[user?.id];
      if (audioElement) {
        audioElement.volume = 1;
        audioElement.srcObject = localMediaStream.current;
      }
    });
  });
}, []); // ✅ Empty dependency array so it runs only once

======================




05: Problem =>

If a user leaves the room, their audioElement stays in memory.

This could lead to memory leaks.

🔹 Fix: Clean up audioElements when a user leaves.
=============

const provideRef = (instance, userId) => {
  if (instance) {
    audioElements.current[userId] = instance;
  } else {
    delete audioElements.current[userId]; // ✅ Remove when user leaves
  }
};

===============
*/
