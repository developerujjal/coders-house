import React from 'react';
import { Routes, Route } from "react-router";
import Root from '../layouts/Root';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Root />} errorElement={<div>Error</div>}>
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;