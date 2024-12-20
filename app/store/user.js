import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: { 
        userInfo: {}
    },
    reducers: {
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    },
});

export const { updateUserInfo } = user.actions;
export default user.reducer;
