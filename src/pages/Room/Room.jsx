import React, { useEffect, useState } from "react";
import useWebRTC from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router";
import useUser from "../../hooks/getUser/useUser";
import styles from "./Room.module.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaHand } from "react-icons/fa6";
import { BsMicMuteFill } from "react-icons/bs";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { FiMic } from "react-icons/fi";

const Room = () => {
  const { id: roomId } = useParams();
  const { dbUser: user } = useUser();
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const [getRoom, setGetRoom] = useState({});
  // const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();

  // Find current user's mute state from clients array
  const currentUserClient = clients.find((client) => client.id === user?.id);
  const isMuted = currentUserClient?.muted ?? true;


  // Fetch room data
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axiosCommon.get(`/api/rooms/${roomId}`);
      data && setGetRoom(data);
    };
    fetchRoom();
  }, [axiosCommon, roomId]);

  const handleMuteClick = () => {
    // setIsMuted(!isMuted);

    if (user?.id) {
      // Toggle mute based on latest state from WebRTC hook
      handleMute(!isMuted, user.id);
    }
  };

  const handManualLeave = () => navigate(-1);

  console.log(clients);
  return (
    <section>
      <div className="container">
        <button onClick={handManualLeave} className={styles.goBack}>
          <FaArrowRightArrowLeft />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          {getRoom && <h2 className={styles.topic}>{getRoom?.roomTopic}</h2>}
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <FaHand />
            </button>
            <button onClick={handManualLeave} className={styles.actionBtn}>
              <FaArrowRotateLeft />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>

        <div className={styles.clientsList}>
          {clients.map((client) => (
            <div className={styles.client} key={client.id}>
              <div className={styles.userHead}>
                <audio
                  ref={(instance) => provideRef(instance, client.id)}
                  autoPlay
                ></audio>
                <img
                  src={client.image}
                  referrerPolicy="no-referrer"
                  alt="avatar"
                  className={styles.userAvatar}
                />
                {/* Only show mute button for current user */}
                {/* client.id !== user.id we also can check into handleMuteClick function
                 by pass client.id */}
                {client.id === user?.id ? (
                  <button onClick={handleMuteClick} className={styles.micBtn}>
                    {isMuted ? (
                      <BsMicMuteFill size={22} />
                    ) : (
                      <FiMic size={22} />
                    )}
                  </button>
                ) : (
                  <div className={styles.micBtn}>
                    {client.muted ? (
                      <BsMicMuteFill size={22} />
                    ) : (
                      <FiMic size={22} />
                    )}
                  </div>
                )}
              </div>
              <h2>{client?.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Room;
