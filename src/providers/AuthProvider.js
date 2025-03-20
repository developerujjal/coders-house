import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { useDispatch } from "react-redux";
import { setAuthUser, setLoading } from '../features/user/userSlice.js'
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(setLoading(true));

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            console.log(currentUser)
            const userData = {
                name: currentUser?.displayName,
                email: currentUser?.email,
                image: currentUser?.photoURL
            }

            const data = currentUser ? userData : null;

            dispatch(setAuthUser(data))

            if (currentUser) {
                try {
                    await axios.post('http://localhost:5000/api/jwt-token', {
                        name: currentUser?.displayName,
                        email: currentUser?.email,
                        image: currentUser?.photoURL
                    }, {
                        withCredentials: true
                    })
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    await axios.post('http://localhost:5000/api/removed-jwt', {}, {
                        withCredentials: true
                    });

                    dispatch(setLoading(true))

                } catch (error) {
                    console.log(error)
                }
            }

        });


        return () => unsubscribe();

    }, [dispatch])

    return children;
};

export default AuthProvider;