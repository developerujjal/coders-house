import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosCommon from '../useAxiosCommon';

const useUser = () => {
    const [dbUser, setDBUser] = useState([]);
    const { user } = useSelector((state) => state.user);
    const axiosCommon = useAxiosCommon();

    useEffect(() => {
        const getUser = async () => {
            if (user?.email) {
                const res = await axiosCommon.get(`/api/user/${user?.email}`);
                if (res.data) {
                    setDBUser(res.data);
                }
            }


        }

        getUser();
    }, [axiosCommon, user?.email])


    return { dbUser }
};

export default useUser;