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
  const [isMute, setIsMute] = useState(true);
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();



  //mute and unmute function
  useEffect(() => {
    handleMute(isMute, user?.id);
  }, [handleMute, isMute, user?.id]);



  //fetch room data
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axiosCommon.get(`/api/rooms/${roomId}`);
      if (data) {
        setGetRoom(data);
      }
    };

    fetchRoom();
  }, [axiosCommon, roomId]);

  const handManualLeave = () => {
    navigate(-1);
  };

  console.log(getRoom);
  return (
    // in audio player the ref instance is default value of ref
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
          {clients.map((client, index) => (
            <div className={styles.client} key={index}>
              <div className={styles.userHead}>
                <audio
                  ref={(instance) => provideRef(instance, client.id)}
                  autoPlay
                  // controls
                ></audio>
                <img
                  src={client.image}
                  referrerPolicy="no-referrer"
                  alt="logo"
                  className={styles.userAvatar}
                />

                <button
                  // onClick={() => handleMuteClick(client.id)}
                  className={styles.micBtn}
                >
                  {client.muted ? (
                    <BsMicMuteFill size={22} />
                  ) : (
                    <FiMic size={22} />
                  )}
                </button>
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
