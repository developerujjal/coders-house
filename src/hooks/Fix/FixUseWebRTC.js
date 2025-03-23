import { useEffect, useRef, useCallback } from "react";
import useStateWithFallback from "./useStateWithFallback"; // Assuming you have this hook

const FixUseWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithFallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);

  const provideRef = (instance, userId) => {
    if (instance) {
      audioElements.current[userId] = instance;
    } else {
      delete audioElements.current[userId]; // ✅ Remove reference on disconnect
    }
  };

  const addNewClients = useCallback(
    (newClient, cb) => {
      setClients((existingClients) => {
        const lookingFor = existingClients.find(
          (client) => client.id === newClient.id
        );
        if (!lookingFor) {
          return [...existingClients, newClient];
        }
        return existingClients;
      }, cb);
    },
    [setClients]
  );

  useEffect(() => {
    const startCapture = async () => {
      try {
        if (!localMediaStream.current) {
          localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
        }
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startCapture().then(() => {
      if (user) {
        addNewClients(user, () => {
          const audioElement = audioElements.current[user.id];
          if (audioElement) {
            audioElement.volume = 0;
            audioElement.srcObject = localMediaStream.current;
          }
        });
      }
    });

    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach((track) => track.stop());
        localMediaStream.current = null;
      }
    };
  }, [addNewClients, user]); // ✅ Runs only once on mount

  return { clients, provideRef };
};

