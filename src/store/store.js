import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import activateReducer from '../features/activated/activatedSlice';
import userRefucer from '../features/user/userSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userRefucer,
    activate: activateReducer

  },
})

export default store;