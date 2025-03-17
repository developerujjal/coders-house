import React from 'react';
import axios from 'axios'

const publicAxios = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true
})

const useAxiosCommon = () => {
    // return publicAxios;

    // publicAxios.interceptors.response.use((config) => {
    //     return config;
    // },
    //     async (error) => {
    //         const orginalReq = error.config;
    //         if (error.response.status === 401 && orginalReq && !orginalReq.isRetry) {
    //             orginalReq.isRetry = true;

    //             try {
    //                 await axios.get('http://localhost:5000/api/refresh', {
    //                     withCredentials: true
    //                 })
    //                 return publicAxios.request(orginalReq)

    //             } catch (error) {
    //                 console.log(error.message)
    //             }
    //         } else {
    //             throw error;
    //         }
    //     })

    return publicAxios;
};

export default useAxiosCommon;