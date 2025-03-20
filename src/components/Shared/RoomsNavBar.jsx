import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase/firebase.config';

const RoomsNavBar = () => {

    const handleLoggedOut = async() => {
        await signOut(auth);
    }

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <div className="text-lg font-bold">Codershouse</div>
            <input
                type="text"
                placeholder="Search rooms..."
                className="px-3 py-1 rounded bg-gray-700 focus:outline-none"
            />
            <div className="flex items-center gap-2">
                <button 
                onClick={handleLoggedOut}
                className="px-4 py-2 bg-green-500 cursor-pointer rounded">Logged Out</button>
                <div className="w-10 h-10 rounded-full bg-gray-600" />
            </div>
        </header>
    );
};

export default RoomsNavBar;