

import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";

const publicAxios = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true
})

const useAxiosCommon = () => {
    const navigate = useNavigate()
    // const location = useLocation()


    useEffect(() => {
        const interceptor = publicAxios.interceptors.response.use(
            (res) => {
                return res
            },
            async (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    await signOut(auth);
                    navigate('/');
                }

                return Promise.reject(error)
            })

        return () => {
            publicAxios.interceptors.response.eject(interceptor)
        }

    }, [navigate])


    return publicAxios
};

export default useAxiosCommon;