import React from 'react';
import { Navigate } from 'react-router';

const RoomsRoute = ({ children }) => {
    const isUser = true;
    const isActive = true;


    if (!isActive) {
        return <Navigate to={'/activate'} />
    }

    if (!isUser) {
        return <Navigate to={'/authenticate'} />
    }


    return children;


};

export default RoomsRoute;