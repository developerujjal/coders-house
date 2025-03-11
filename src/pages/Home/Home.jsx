import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';


const Home = () => {

    const navigate  = useNavigate();

    const GoToRegister = () => {
        // navigate('/register')
        console.log("hello")
    }


    return (
        <section>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center h-screen'>
                    <div className='bg-[#1D1D1D] w-xl p-10 text-center font-nunito rounded-xl' >
                        <h1 className='flex justify-center items-center text-2xl font-bold'>
                            <span className='text-4xl'>&#128075;</span>
                            Welcome to Codershouse!
                        </h1>
                        <p className='xl:px-16 font-nunito text-[#C4C5C5] my-5 xl:my-8'>We’re working hard to get Codershouse ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks </p>
                        <button 
                        onClick={GoToRegister}
                        className='flex items-center gap-2 cursor-pointer bg-[#0077FF] px-4 py-2.5 font-bold text-base justify-center mx-auto mb-3 hover:bg-[#0756b1] transition-all rounded-full'>
                            Get your username
                            <FaLongArrowAltRight />
                        </button>
                        <p className='text-center text-[#0077FF] text-sm'>Have an invite text? <Link className='font-bold text-md'>Singin</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;