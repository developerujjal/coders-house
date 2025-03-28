import React, { useEffect, useState } from 'react';
import styles from './Rooms.module.css';
import RoomCard from '../../components/RoomCard/RoomCard';
import CreateRoomModal from '../../components/Modals/CreateRoomModal';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import useUser from '../../hooks/getUser/useUser';

// const rooms = [
//     {
//         id: 1,
//         topic: 'Which framework best for frontend ?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'What’s new in machine learning?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 4,
//         topic: 'Why people use stack overflow?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'Artificial inteligence is the future?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
//             },
//         ],
//         totalPeople: 40,
//     },
// ];

const Rooms = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const axiosCommon = useAxiosCommon();
    const {dbUser} = useUser()

    console.log(dbUser)

    useEffect(() => {
        const fetchRoom = async () => {
            const res = await axiosCommon.get(`/api/rooms`);
            if (res.data) {
                setRooms(res.data)
            }
        }

        fetchRoom();
    }, [axiosCommon])



    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>

                    </div>
                    <div className={styles.right}>
                        <button
                            onClick={() => setModalOpen(true)}
                            className={styles.startRoomButton}
                        >
                            <span>Start a room</span>
                        </button>
                    </div>

                    {
                        modalOpen && <CreateRoomModal setModalOpen={setModalOpen} />
                    }
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <RoomCard key={room._id} room={room} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Rooms;