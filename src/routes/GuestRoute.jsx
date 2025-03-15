import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const GuestRoute = ({ children }) => {
    const { isAuth } = useSelector((state) => state.auth)



    if (!isAuth) {
        return children;
    }


    return <Navigate to={'/rooms'} />

};

export default GuestRoute;