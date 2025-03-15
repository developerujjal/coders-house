import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const RoomsRoute = ({ children }) => {
    const { user, isAuth } = useSelector((state) => state.auth);


    if (!user?.isActivated) {
        return <Navigate to={'/activate'} />
    }

    if (!isAuth) {
        return <Navigate to={'/authenticate'} />
    }


    return children;


};

export default RoomsRoute;