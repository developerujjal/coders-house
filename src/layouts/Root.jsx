import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/Shared/NavBar';

const Root = () => {
    return (
        <div className='bg-[#121212] text-white'>
            <NavBar />
            <main className=''>
                <Outlet />
            </main>
            <footer>
                <p className='text-center font-nunito p-3'>This is Footer</p>
            </footer>
        </div>
    );
};

export default Root;