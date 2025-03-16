import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    avater: '',
};

export const activatedSlice = createSlice({
    name: 'activated',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;

        },

        setAvater: (state, action) => {
            state.avater = action.payload

        }
    },
});


export const { setName, setAvater } = activatedSlice.actions;

export default activatedSlice.reducer;