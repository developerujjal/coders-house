import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActive: false,
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
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes



        },

        setOpt: (state, action) => {
            const {hash, phone} = action.payload;

            state.otp.hash = hash;
            state.otp.phone = phone

        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuth, setOpt} = authSlice.actions

export default authSlice.reducer