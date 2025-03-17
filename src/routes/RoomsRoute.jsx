import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const RoomsRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.user)

    if (loading) {
        return <p>Loading......</p>
    }

    if (!user) {
        return <Navigate to={'/authenticate'} />
    }


    return children;


};

export default RoomsRoute;