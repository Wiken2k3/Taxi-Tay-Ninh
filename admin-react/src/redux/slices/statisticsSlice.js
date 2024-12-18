import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import statisticsService from '../../services/statisticsService';



export const fetchAllTotal = createAsyncThunk(
    'statistics/fetchAllTotal',
    async (_, { rejectWithValue }) => {
        try {
            const allTotal = await statisticsService.fetchAllTotal();
            return allTotal.data;

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
export const fetchWeekTour = createAsyncThunk(
    'statistics/fetchWeekTour',
    async (_, { rejectWithValue }) => {
        try {
            const res = await statisticsService.fetchWeeklyStatisticsTour();
            return res.data;

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


export const fetchWeekTaxi = createAsyncThunk(
    'statistics/fetchWeekTaxi',
    async (_, { rejectWithValue }) => {
        try {
            const res = await statisticsService.fetchWeeklyStatisticsTaxi();
            return res.data;

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

export const fetchRevenue = createAsyncThunk(
    'statistics/fetchRevenue',
    async (_, { rejectWithValue }) => {
        try {
            const res = await statisticsService.fetchMonthlyRevenue();
            return res.data;

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







const initialState = {
    totalRevenue: 0,
    totalTourBooking: 0,
    totalTaxiBooking: 0,
    totalTour:0,
    totalUser: 0,
    totalCar: 0,
    totalNews: 0,
    totalComment: 0,
    totalCommetPending:0,
    totalContactPending: 0,
    listRevenue: [],
    listWeekTour: [],
    listWeekTaxi: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
}
export const statisticsSlice = createSlice({
    name: 'statistics',
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
            .addCase(fetchAllTotal.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllTotal.fulfilled, (state, action) => {

                state.totalRevenue = action.payload.totalRevenue;
                state.totalTourBooking = action.payload.totalTourBooking;
                state.totalTaxiBooking = action.payload.totalTaxiBooking;
                state.totalTour = action.payload.totalTour;
                state.totalUser = action.payload.totalUser;
                state.totalCar = action.payload.totalCar;
                state.totalNews = action.payload.totalNews;
                state.totalComment = action.payload.totalComment;
                state.totalCommetPending = action.payload.totalCommetPending;
                state.totalContactPending = action.payload.totalContactPending;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_PAYMENT';

            })
            .addCase(fetchAllTotal.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })



            .addCase(fetchWeekTour.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchWeekTour.fulfilled, (state, action) => {
               
                state.listWeekTour = action.payload;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_PAYMENT';

            })
            .addCase(fetchWeekTour.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })


            .addCase(fetchWeekTaxi.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchWeekTaxi.fulfilled, (state, action) => {

                state.listWeekTaxi = action.payload;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_PAYMENT';

            })
            .addCase(fetchWeekTaxi.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            .addCase(fetchRevenue.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchRevenue.fulfilled, (state, action) => {

                state.listRevenue = action.payload;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_PAYMENT';

            })
            .addCase(fetchRevenue.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            



    },
})


export const { resetSuccess } = statisticsSlice.actions;
export default statisticsSlice.reducer

