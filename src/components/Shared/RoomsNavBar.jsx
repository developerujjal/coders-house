import React from 'react';

const RoomsNavBar = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <div className="text-lg font-bold">Codershouse</div>
            <input
                type="text"
                placeholder="Search rooms..."
                className="px-3 py-1 rounded bg-gray-700 focus:outline-none"
            />
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-green-500 rounded">Start a room</button>
                <div className="w-10 h-10 rounded-full bg-gray-600" />
            </div>
        </header>
    );
};

export default RoomsNavBar;