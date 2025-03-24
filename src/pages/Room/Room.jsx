import React from "react";
import useWebRTC from "../../hooks/useWebRTC";
import { useParams } from "react-router";
import useUser from "../../hooks/getUser/useUser";

const Room = () => {
  const { id: roomId } = useParams();
  const { dbUser: user} = useUser();

  const { clients, provideRef } = useWebRTC(roomId, user);

  return (
    // in audio player the ref instance is default value of ref
    <section>
      <h1>All Participents</h1>
      {clients.map((client, index) => (
        <div key={index}>
          <audio
            ref={(instance) => provideRef(instance, client.id)}
            autoPlay
            controls
          ></audio>
          <h2>{client?.name}</h2>
        </div>
      ))}
    </section>
  );
};

export default Room;
