import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tourBookingService from '../../services/tourBookingService';
import { Status } from '../../enums/status.enum';


export const fetchAllTourBooking = createAsyncThunk(
    'tourBooking/fetchAllTourBooking',
    async (tourData, { rejectWithValue }) => {
        try {
            const tourBooking = await tourBookingService.fetchAllTourBooking(tourData.page, tourData.limit);  
            return tourBooking.data;

        }
        catch (error) {
            // Gọi rejectWithValue để trả về lỗi tùy chỉnh
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
)




export const toggleTour = createAsyncThunk(
    'tourBooking/toggleTour',

    async (tourData, { rejectWithValue }) => {
        try {
            if (tourData.action === Status.APPROVED) {
                const response = await tourBookingService.approveTourBooking(tourData.id);
                return response.data; // Trả về dữ liệu khi thành công
            }
            else if (tourData.action === Status.REJECTED) {
                const response = await tourBookingService.rejectTourBooking(tourData.id);
                return response.data; // Trả về dữ liệu khi thành công
            }


        } catch (error) {

            // Gọi rejectWithValue để trả về lỗi tùy chỉnh
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



const initialState = {
    totalPages: 0,
    totalRows: 0,
    listTourBooking: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
}
export const tourBookingSlice = createSlice({
    name: 'tourBooking',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        resetSuccess: (state) => {
            state.isSuccess = false;
            state.actionType = '';

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTourBooking.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllTourBooking.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listTourBooking = action.payload.tourBooking;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_TOURBOOKING';

            })
            .addCase(fetchAllTourBooking.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            // Khoá/ Mở khoá
            .addCase(toggleTour.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(toggleTour.fulfilled, (state, action) => {
                state.listTourBooking = state.listTourBooking.map(tourBooking =>
                    tourBooking._id === action.payload._id ? action.payload : tourBooking
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true
                state.actionType = 'ACTIVE_TOURBOOKING';


            })
            .addCase(toggleTour.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

 

    },
})


export const { resetSuccess } = tourBookingSlice.actions;
export default tourBookingSlice.reducer

