import React from 'react';
import { Routes, Route } from "react-router";
import Root from '../layouts/Root';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import GuestRoute from './GuestRoute';
import ActivatePage from '../pages/Activate/ActivatePage';
import SemiProtectedRoute from './SemiProtectedRoute';
import RoomsRoute from './RoomsRoute';
import Rooms from '../pages/Rooms/Rooms';


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Root />} errorElement={<div>Error</div>}>
                    <Route index element={<Home />} />
                    <Route path='/authenticate' element={<GuestRoute><Register /></GuestRoute>} />
                    <Route path='/activate' element={<SemiProtectedRoute><ActivatePage /></SemiProtectedRoute>} />
                    <Route path='/rooms' element={<RoomsRoute><Rooms /></RoomsRoute>} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;