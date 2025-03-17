import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/auth/authSlice';

const useLoadingWithRefresh = () => {
    const disPatch = useDispatch();
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await axios.get('http://localhost:5000/api/auth-observer', {
    //                 withCredentials: true
    //             })



    //             disPatch(setAuth(data));
    //             setLoading(false)




    //         } catch (error) {
    //             console.log(error)
    //             setLoading(false)

    //         }
    //     })();
    // }, [disPatch]);


    return { loading };
};

export default useLoadingWithRefresh;