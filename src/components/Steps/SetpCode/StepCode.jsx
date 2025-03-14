import React, { useState } from 'react';
import Button from '../Btn/Button';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useSelector } from 'react-redux'

const StepCode = () => {

    const [otp, setOtp] = useState('');
    const { phone, hash } = useSelector((state) => state.auth.otp);
    const axiosCommon = useAxiosCommon();


    const handleSubmit = async () => {
        try {
            const res = await axiosCommon.post('/api/verify-otp', {
                otp,
                phone,
                hash
            });
            console.log(res)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center h-screen'>
                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                        <h2 className="text-xl font-semibold mb-4">Enter the code we just sent</h2>
                        <div className="flex justify-center space-x-4">
                            <input
                                type="text"
                                // maxLength="1"
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-56 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* <input
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /> */}
                        </div>

                        <Button onNext={handleSubmit} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepCode;