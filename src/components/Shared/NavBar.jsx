import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router';
import { auth } from '../../firebase/firebase.config';
import { useSelector } from 'react-redux';

const NavBar = () => {

    const { user } = useSelector((state) => state.user)

    const handleLogOut = async () => {
        if (!user) {
            return;
        }

        await signOut(auth)
    }


    return (
        <header>
            <div className='container mx-auto px-4'>
                <div className='flex justify-between items-center py-4'>
                    <Link to={'/'} className='w-3xs flex items-center gap-2'>
                        <span className='text-4xl'>&#128075;</span>
                        <h2 className='font-nunito font-bold text-xl'>Coders House</h2>

                    </Link>

                    {
                        user && (<button onClick={handleLogOut} className='px-4 py-2 bg-[#d9b100] text-white cursor-pointer hover:bg-[#705c05]'>Log Out</button>)
                    }
                </div>
            </div>
        </header>
    );
};

export default NavBar;