import React from 'react';
import { Routes, Route } from "react-router";
import Root from '../layouts/Root';
import Home from '../pages/Home/Home';
import PhoneNumberInput from '../pages/PhoneNumberInput/PhoneNumberInput';


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Root />} errorElement={<div>Error</div>}>
                    <Route index element={<PhoneNumberInput />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;