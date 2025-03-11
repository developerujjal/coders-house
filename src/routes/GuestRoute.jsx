import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

const GuestRoute = ({ children }) => {

    const isUser = true;
    const isActive = false;
    const navigate = useNavigate();


    useEffect(() => {
        if (isUser) {
            if (!isActive) {
                navigate('/activate');
            } else {
                navigate('/rooms');
            }
        }
    }, [isUser, isActive, navigate]);



    if (!isUser) {
        return children;
    }


    return <Navigate to={'/rooms'} />

};

export default GuestRoute;