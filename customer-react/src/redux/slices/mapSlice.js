// redux/slices/mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo trạng thái ban đầu
const initialState = {
    origin: null,
    destination: null,
};

// Tạo slice
const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setOrigin(state, action) {
            state.origin = action.payload;
        },
        setDestination(state, action) {
            state.destination = action.payload;
        },
     
    },
});

// Export actions
export const { setOrigin, setDestination } = mapSlice.actions;

// Export reducer
export default mapSlice.reducer;
