import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tourService from '../../services/tourService';
import paymentService from '../../services/paymentService';

// Các async thunks
export const fetchAllTours = createAsyncThunk(
    'tours/fetchAllTours',
    async (tourData, { rejectWithValue }) => {
        try {
            const tours = await tourService.fetchAllTours(tourData.page, tourData.limit);
            return tours.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Something went wrong');
        }
    }
);

export const fetchTourHot = createAsyncThunk(
    'tours/fetchTourHot',
    async (tourData, { rejectWithValue }) => {
        try {
            const tourHot = await tourService.fetchTourHot(tourData);
    
            return tourHot.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Something went wrong');
        }
    }
);

// Khởi tạo state ban đầu
const initialState = {
    totalPages: 0,
    totalRows: 0,
    listTours: [],
    listTourHot:[],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
};

// Tạo slice
export const tourSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
            state.actionType = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all tours
            .addCase(fetchAllTours.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllTours.fulfilled, (state, action) => {
                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listTours = action.payload.tours;
                state.isLoading = false;
                state.isError = false;
                state.actionType = 'GET_TOUR';
            })
            .addCase(fetchAllTours.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })


            //Fect Tour Hot
            .addCase(fetchTourHot.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTourHot.fulfilled, (state, action) => {
                state.listTourHot = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.actionType = 'GET_TOURHOT';
            })
            .addCase(fetchTourHot.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
         
    },
});

export const { resetSuccess } = tourSlice.actions;
export default tourSlice.reducer;
