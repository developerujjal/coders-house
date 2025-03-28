import { useState } from "react";
import { IoMdPhonePortrait } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import Button from "../Btn/Button";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useDispatch } from 'react-redux'
import { setOpt } from '../../../features/auth/authSlice'
import GoogleLogIn from "../../SocialLogin/GoogleLogIn";


export default function PhoneNumberInput({ onNext }) {
    const [selected, setSelected] = useState("phone");
    const [number, setNumber] = useState(0);
    const axiosCommon = useAxiosCommon();
    const dispatch = useDispatch();

    // console.log(number)

    const handleSendOTP = async () => {
        if(!number){
            return;
        }
        
        const res = await axiosCommon.post('/api/send-otp', { phone: number });
        console.log(res?.data)

        dispatch(setOpt({
            hash: res?.data?.data,
            phone: res?.data?.phone
        }));

        onNext();
    }



    return (
        <section>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center h-screen">
                    <div className="relative">

                        {
                            selected === "phone" ? (
                                <>
                                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                                        <h2 className="text-lg font-semibold flex items-center justify-center gap-2">
                                            <span className="text-red-500">☎️</span> Enter your phone number
                                        </h2>
                                        <div className="mt-4 flex items-center gap-2 border border-gray-600 rounded-lg p-2 bg-zinc-800">
                                            <span className="flex items-center gap-1">
                                                BD
                                            </span>
                                            <input
                                                type="text"
                                                value={number}
                                                placeholder="0123456789"
                                                onChange={(e) => setNumber(e.target.value)}
                                                className="bg-transparent w-full outline-none text-gray-400"

                                            />
                                        </div>

                                        <button
                                            onClick={handleSendOTP}
                                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium w-full cursor-pointer">
                                            Next →
                                        </button>

                                        <p className="text-xs text-gray-400 mt-2">
                                            By entering your number, you're agreeing to our
                                            <span className="text-blue-400"> Terms of Service</span> and
                                            <span className="text-blue-400"> Privacy Policy</span>. Thanks!
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                                        <h2 className="text-lg font-semibold flex items-center justify-center gap-2">
                                            <span>📧</span> Enter your email id
                                        </h2>
                                        <div className="mt-4 border border-gray-600 rounded-lg p-2 bg-zinc-800">
                                            <input
                                                type="text"
                                                placeholder="Write your email"
                                                className="bg-transparent w-full outline-none text-gray-400 text-center"
                                            />
                                        </div>

                                        <Button onNext={onNext} />

                                        <p className="text-xs text-gray-400 mt-2">
                                            By entering your number, you're agreeing to our
                                            <span className="text-blue-400"> Terms of Service</span> and
                                            <span className="text-blue-400"> Privacy Policy</span>. Thanks!
                                        </p>
                                    </div>
                                </>
                            )
                        }


                        <div className="absolute -top-12 right-0 flex gap-3">
                            <button
                                className={`p-2 rounded-lg cursor-pointer ${selected === "phone" ? "bg-blue-500" : "bg-zinc-700"}`}
                                onClick={() => setSelected("phone")}
                            >
                                <IoMdPhonePortrait className="w-5 h-5 text-white" />
                            </button>
                            <button
                                className={`p-2 rounded-lg cursor-pointer ${selected === "mail" ? "bg-blue-500" : "bg-zinc-700"}`}
                                onClick={() => setSelected("mail")}
                            >
                                <CiMail className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        <GoogleLogIn />
                    </div>
                </div>
            </div>
        </section>
    );
}
