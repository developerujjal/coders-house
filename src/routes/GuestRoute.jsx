import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const GuestRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.user)

    if (loading) {
        return <p>Loading......</p>
    }

    if (!user) {
        return children;
    }


    return <Navigate to={'/rooms'} />;

};

export default GuestRoute;