import React from "react";
import styles from "./RoomCard.module.css";
import chatBubble from "../../assets/chat-bubble.png";
import userIcon from "../../assets/user-icon.png";
import { useNavigate } from "react-router";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/room/${room._id}`);
  };

  return (
    <div onClick={handleJoinRoom} className={styles.card}>
      <h3 className={styles.topic}>{room.roomTopic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker, index) => (
            <img
              key={index}
              src={speaker.image}
              alt="speaker-avatar"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker, index) => (
            <div key={index} className={styles.nameWrapper}>
              <span>{speaker.name}</span>
              <img src={chatBubble} alt="chat-bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.length}</span>
        <img src={userIcon} alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
