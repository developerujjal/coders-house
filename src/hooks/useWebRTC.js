import React, { useCallback, useEffect, useRef } from "react";
import useStateWithFallback from "./useStateWithFallback";

const users = [
  { id: 1, name: "Hello" },
  { id: 2, name: "Hello 2" },
];
const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithFallback(users);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  //extra checks
  // cb mean call back fn
  const addNewClients = useCallback(
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
      addNewClients(user, () => {
        const audioElement = audioElements.current[user?.id];
        if (audioElement) {
          audioElement.volume = 0,
            audioElement.srcObject = localMediaStream.current
        }

      });
    });
  }, [addNewClients, user]);



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
const addNewClients = useCallback(
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

useEffect runs every time user or addNewClients changes.

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
    addNewClients(user, () => {
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
