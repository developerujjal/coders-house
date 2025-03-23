import { io } from "socket.io-client";

const socketInit = () => {
  const options = {
    forceNew: true, // Force a new connection
    reconnectionAttempts: Infinity, // Unlimited reconnection attempts
    timeout: 1000, // Connection timeout
    transports: ["websocket"], // Use WebSocket only
  };

  return io("http://localhost:5000", options);
};

export default socketInit;
