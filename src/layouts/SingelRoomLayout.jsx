import React from "react";
import { Outlet } from "react-router";

const SingelRoomLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-xl text-center font-bold">Voice Chat Room</h2>

            {/* Room Content (Will be replaced by <Outlet />) */}
            <Outlet />
        </div>
    );
};

export default SingelRoomLayout;
