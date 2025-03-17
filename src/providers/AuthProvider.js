import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { useDispatch } from "react-redux";
import { setAuthUser, setLoading } from '../features/user/userSlice.js'

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(setLoading(true));

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            const userData = {
                name: currentUser?.displayName,
                email: currentUser?.email,
                image: currentUser?.photoURL
            }

            dispatch(setAuthUser(userData))

            if (currentUser) {
                console.log(currentUser)
            } else {
                console.log(currentUser)
            }


        });


        return () => unsubscribe();

    }, [dispatch])

    return children;
};

export default AuthProvider;