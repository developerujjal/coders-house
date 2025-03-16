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
    return publicAxios;
};

export default useAxiosCommon;