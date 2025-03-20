import { useState } from "react";

export default function CreateRoomModal({ setModalOpen }) {

    const [roomType, setRoomType] = useState('open');
    const [topic, setTopic] = useState('')

    console.log(topic)


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000ba] bg-opacity-50 z-10">
            <div className="bg-gray-900 text-white rounded-xl shadow-lg w-96 p-6">

                <button
                    onClick={() => setModalOpen(false)}
                    className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-white">✖</button>

                <h2 className="text-lg font-semibold mb-3">Enter the topic to be discussed</h2>

                <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    type="text" placeholder="" className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-gray-500" />

                <h3 className="text-sm font-semibold mt-4 mb-2">Room type</h3>
                <div className="flex justify-between items-center gap-4">

                    <div
                        onClick={() => setRoomType('open')}
                        className={`${roomType === 'open' ? 'bg-gray-700' : ' bg-gray-800'} flex flex-col items-center w-full py-3 rounded-lg cursor-pointer hover:bg-gray-700`}>
                        <span className="text-3xl">🌍</span>
                        <span className="text-xs mt-1">Open</span>
                    </div>

                    <div
                        onClick={() => setRoomType('social')}
                        className={`${roomType === 'social' ? 'bg-gray-700' : 'bg-gray-800'} flex flex-col items-center w-full py-3 rounded-lg cursor-pointer hover:bg-gray-700`}>
                        <span className="text-3xl">👥</span>
                        <span className="text-xs mt-1">Social</span>
                    </div>

                    <div
                        onClick={() => setRoomType('closed')}
                        className={`${roomType === 'closed' ? 'bg-gray-700' : 'bg-gray-800'} flex flex-col items-center w-full py-3 rounded-lg cursor-pointer hover:bg-gray-700`}>
                        <span className="text-3xl">🔒</span>
                        <span className="text-xs mt-1">Closed</span>
                    </div>
                </div>

                <p className="text-center text-gray-400 text-sm mt-4">Start a room, open to everyone</p>
                <button className="w-full mt-3 bg-green-600 cursor-pointer hover:bg-green-500 text-white py-2 rounded-lg flex justify-center items-center gap-2 text-lg">
                    🚀 Let's Go
                </button>
            </div>
        </div>

    );
}
