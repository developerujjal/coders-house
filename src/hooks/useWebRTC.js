import React, { useCallback, useEffect, useRef } from "react";
import useStateWithFallback from "./useStateWithFallback";
import socketInit from "../socket";
import ACTIONS from "../actions";
import freeice from "freeice";

// Custom hook for WebRTC functionality
const useWebRTC = (roomId, user) => {
  // State to store the clients currently in the room
  const [clients, setClients] = useStateWithFallback([]);

  // Refs to store elements and media streams
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socketRef = useRef(null);
  const clientsRef = useRef(null);


  // Initialize socket connection on component mount
  useEffect(() => {
    socketRef.current = socketInit();
  }, []); // Empty dependency array ensures this runs only once





  const addNewClient = useCallback(
    (newClient, cb) => {
      setClients((existingClients) => {
        // Avoid adding duplicate clients
        // const lookingFor = existingClients.find((client) => client.id === newClient.id);
        // if (!lookingFor) {
        //   return [...existingClients, newClient];
        // }

        if (!existingClients.some((client) => client.id === newClient.id)) {
          return [...existingClients, newClient];
        }
        return existingClients;
      }, cb);
    },
    [setClients]
  );



  // Capture the local media stream and join the room
  useEffect(() => {
    const startCapture = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true, // Only capture audio for now
        });

        // // 2. Immediately disable the audio track (WebRTC level mute)
        // const audioTrack = localMediaStream.current.getAudioTracks()[0];
        // audioTrack.enabled = false; // <- Critical WebRTC mute


        // Add the user as the first client in the room
        addNewClient({ ...user, muted: true }, () => {
          const audioElement = audioElements.current[user?.id];
          if (audioElement) {
            audioElement.volume = 0; // Mute local audio
            audioElement.srcObject = localMediaStream.current;
          }

          // Emit the JOIN action to the server to join the room
          socketRef.current.emit(ACTIONS.JOIN, { roomId, user });
        });
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startCapture();

    // Cleanup on component unmount
    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach((track) => track.stop()); // Stop all media tracks
        localMediaStream.current = null; // Nullify the stream
      }
      socketRef.current.emit(ACTIONS.LEAVE, { roomId }); // Emit LEAVE action when leaving the room
    };
  }, [roomId, user]);



  // Handle new peer joining the room
  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      // If a connection already exists, do nothing
      if (connections.current[peerId]) return;

      // Create a new peer connection
      const peerConnection = new RTCPeerConnection({ iceServers: freeice() });
      connections.current[peerId] = peerConnection;

      // Handle ICE candidates (network information)
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit(ACTIONS.RELAY_ICE, {
            peerId,
            icecandidate: event.candidate,
          });
        }
      };

      // Handle incoming media streams from the remote peer
      peerConnection.ontrack = ({ streams: [remoteStream] }) => {
        addNewClient({ ...remoteUser, muted: true }, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            let interval = setInterval(() => {
              // Retry every 1 second if audio element is not available
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) clearInterval(interval); // Stop retrying once settled
            }, 1000);
          }
        });
      };

      // Add the local media tracks to the peer connection
      localMediaStream.current?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localMediaStream.current);
      });

      // If the peer is the first one to connect, create an offer
      if (createOffer) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socketRef.current.on(ACTIONS.ADD_PEER, handleNewPeer);
    return () => socketRef.current.off(ACTIONS.ADD_PEER, handleNewPeer); // Cleanup listener
  }, [addNewClient]);



  // Handle incoming ICE candidate
  useEffect(() => {
    socketRef.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate && connections.current[peerId]) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socketRef.current.off(ACTIONS.ICE_CANDIDATE); // Cleanup listener
    };
  }, []);



  // Handle remote session description (SDP) for peer connections
  useEffect(() => {
    const handleRemoteSDP = async ({ peerId, sessionDescription }) => {
      const peerConnection = connections.current[peerId];
      if (!peerConnection) return;

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(sessionDescription)
      );

      if (sessionDescription.type === "offer") {
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socketRef.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);
    return () => socketRef.current.off(ACTIONS.SESSION_DESCRIPTION); // Cleanup listener
  }, []);



  // Handle removal of peers (users leaving the room)
  useEffect(() => {
    const handleRemovePeer = ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
        delete connections.current[peerId];
      }
      delete audioElements.current[userId];

      // Remove the client from the state
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== userId)
      );
    };

    socketRef.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    return () => socketRef.current.off(ACTIONS.REMOVE_PEER); // Cleanup listener
  }, [setClients]);




  //Store the clients into the clientsRef
  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);




  // Updated "Listen for mute/unmute" useEffect
  useEffect(() => {
    const updateMuteState = ({ userId, muteState }) => {
      console.log("mute/unmute: ", muteState)
      setClients(
        (prev) =>
          prev.map(client =>
            client.id === userId ? { ...client, muted: muteState } : client
          ),
        () => { } // Empty callback to satisfy hook's API
      );
    };

    socketRef.current.on(ACTIONS.MUTE, ({ userId }) =>
      updateMuteState({ userId, muteState: true })
    );

    socketRef.current.on(ACTIONS.UN_MUTE, ({ userId }) =>
      updateMuteState({ userId, muteState:false })
    );

    return () => {
      socketRef.current.off(ACTIONS.MUTE);
      socketRef.current.off(ACTIONS.UN_MUTE);
    };
  }, [setClients]);




  // Helper function to provide reference to audio elements
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };


  //Hanlde mute and unmute
  const handleMute = (isMute, userId) => {

    console.log("MUTE IS: ", isMute)

    if (userId === user.id) {
      const audioTrack = localMediaStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMute;

        // Emit action
        const action = isMute ? ACTIONS.MUTE : ACTIONS.UN_MUTE;
        socketRef.current.emit(action, { roomId, userId });

        // Update clients state WITH callback (second argument)
        setClients(
          (prev) => prev.map(client =>
            client.id === userId ? { ...client, muted: isMute } : client
          ),
          () => {/* Optional: Add logic here if needed after state update */ }
        );

        console.log(clients)
      }
    }
  };




  // Return the list of clients and the provideRef function
  return { clients, provideRef, handleMute };
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
