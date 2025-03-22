import React, { useEffect, useRef } from "react";
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

  //Capture the audio media

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture();
  }, []);

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



*/
