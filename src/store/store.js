import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import activateReducer from '../features/activated/activatedSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    activate: activateReducer

  },
})

export default store;