import React from "react";
import { Outlet } from 'react-router'
import RoomsNavBar from "../components/Shared/RoomsNavBar";

const RoomsLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* Header */}
            <RoomsNavBar />

            {/* Main Content */}
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default RoomsLayout;
