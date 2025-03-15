import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null,
    otp: {
        phone: '',
        hash: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            // const { accessToken, user } = action.payload;
            console.log("setAuth called with:", action.payload);

            const { user } = action.payload;

            state.user = user;
            state.isAuth = true;


        },

        setOpt: (state, action) => {
            const { hash, phone } = action.payload;

            state.otp.hash = hash;
            state.otp.phone = phone

        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth, setOpt } = authSlice.actions

export default authSlice.reducer