import React from 'react';
import { Link } from 'react-router';

const NavBar = () => {
    return (
        <header>
            <div className='container mx-auto px-4'>
                <div className='py-4'>
                    <Link to={'/'} className='flex items-center gap-2'>
                        <span className='text-4xl'>&#128075;</span>
                        <h2 className='font-nunito font-bold text-xl'>Coders House</h2>

                    </Link>
                </div>
            </div>
        </header>
    );
};

export default NavBar;