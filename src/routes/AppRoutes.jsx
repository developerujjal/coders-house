import React from 'react';
import { Routes, Route } from "react-router";
import Root from '../layouts/Root';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Root />} errorElement={<div>Error</div>}>
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/sign-in' element={<SignIn />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;