import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tourService from '../../services/tourService';

// Các async thunks
export const fetchAllTours = createAsyncThunk(
    'tours/fetchAllTours',
    async (tourData, { rejectWithValue }) => {
        try {
            const tours = await tourService.fetchAllTours(tourData.page, tourData.limit);
            
            return tours.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Kiểm tra nếu error.response.data.message là một mảng
                if (Array.isArray(error.response.data.message)) {
                    // Trả về các lỗi trong mảng dưới dạng một chuỗi duy nhất
                    return rejectWithValue(error.response.data.message.join(', '));
                }
                // Nếu message không phải là mảng, trả về thông báo lỗi đơn lẻ
                return rejectWithValue(error.response.data.message);
            }

            // Trường hợp lỗi khác hoặc không có response, trả về thông báo lỗi chung
            return rejectWithValue('Something went wrong');
        }
    }
);

// export const addTour = createAsyncThunk(
//     'tours/addTour',
//     async (tourData, { rejectWithValue }) => {
//         try {
          
//             const response = await tourService.addTour(tourData.title, tourData.diadiem, tourData.price, tourData.images);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message || 'Something went wrong');
//         }
//     }
// );

export const addTour = createAsyncThunk(
    'tours/addTour',
    async ({tourData, imagesData}, { rejectWithValue }) => {
        try {
          
            const response = await tourService.addTour(tourData, imagesData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Kiểm tra nếu error.response.data.message là một mảng
                if (Array.isArray(error.response.data.message)) {
                    // Trả về các lỗi trong mảng dưới dạng một chuỗi duy nhất
                    return rejectWithValue(error.response.data.message.join(', '));
                }
                // Nếu message không phải là mảng, trả về thông báo lỗi đơn lẻ
                return rejectWithValue(error.response.data.message);
            }

            // Trường hợp lỗi khác hoặc không có response, trả về thông báo lỗi chung
            return rejectWithValue('Something went wrong');
        }
    }
);

export const updateTour = createAsyncThunk(
    'tours/updateTour',
    async ({id, tourData, imagesData }, { rejectWithValue }) => {
     
        try {
            const response = await tourService.updateTour(id, tourData, imagesData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Something went wrong');
        }
    }
);

export const deleteTour = createAsyncThunk(
    'tours/deleteTour',
    async (tourData, { rejectWithValue }) => {
        try {
            await tourService.deleteTour(tourData.id);
        
            return { id: tourData.id };
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
            // Add tour
            .addCase(addTour.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addTour.fulfilled, (state, action) => {
                state.listTours = [...state.listTours, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_TOUR';
            })
            .addCase(addTour.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            // Update tour
            .addCase(updateTour.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateTour.fulfilled, (state, action) => {
                state.listTours = state.listTours.map(tour =>
                    tour._id === action.payload._id ? action.payload : tour
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'UPDATE_TOUR';
            })
            .addCase(updateTour.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            // Delete tour
            .addCase(deleteTour.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteTour.fulfilled, (state, action) => {
                state.listTours = state.listTours.filter(tour => tour._id !== action.payload._id);
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'DELETE_TOUR';
            })
            .addCase(deleteTour.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.actionType = '';
            });
    },
});

export const { resetSuccess } = tourSlice.actions;
export default tourSlice.reducer;
