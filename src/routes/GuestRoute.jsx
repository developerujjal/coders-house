import React from 'react';
import { Navigate } from 'react-router';

const GuestRoute = ({ children }) => {

    const isUser = false;
    const isActive = true;


    // useEffect(() => {
    //     if (isUser) {
    //         if (!isActive) {
    //             navigate('/activate');
    //         } else {
    //             navigate('/rooms');
    //         }
    //     }
    // }, [isUser, isActive, navigate]);

    if (!isActive) {
        return <Navigate to={'/activate'} />
    }

    if (!isUser) {
        return children;
    }


    return <Navigate to={'/rooms'} />

};

export default GuestRoute;