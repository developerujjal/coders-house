import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true, // Initially loading
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setAuthUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
