import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tourBookingService from '../../services/tourBookingService';
import paymentService from '../../services/paymentService';
import { PaymentType } from '../../enums/payment.enums';



export const fetchAllTourBookingCurrentUser = createAsyncThunk(
    'tourBooking/fetchAllTourBookingCurrentUser',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const tourBooking = await tourBookingService.fetchAllTourBookingCurrentUser(page, limit);  
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



export const addTourBooking = createAsyncThunk(
    'tourBooking/addTourBooking',
    async (tourBookingData, { rejectWithValue }) => {   
        try {
            
            const tourBooking = await tourBookingService.addTourBooking(tourBookingData); // Truyền đối tượng tourData
            const dataTourBooking = tourBooking.data
            if (dataTourBooking.paymentMethods === PaymentType.VNPAY) {
                const paymentData = {   
                    tourBookingId: dataTourBooking._id,
                    amount: dataTourBooking.price,
                    orderInfo: `TX${dataTourBooking.price}`
                }
                const paymentResponse = await paymentService.createUrlPayment(paymentData);
                if (paymentResponse.statusCode === 201) {
                    const paymentUrl = paymentResponse.data.paymentUrl;
                    window.location.href = paymentUrl;
                } else {
                    return rejectWithValue('Failed to create payment URL');
                }

            }
       
            return tourBooking.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || 'Something went wrong');
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
            .addCase(fetchAllTourBookingCurrentUser.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllTourBookingCurrentUser.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listTourBooking = action.payload.tourBooking;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_TOURBOOKING';

            })
            .addCase(fetchAllTourBookingCurrentUser.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            // Khoá/ Mở khoá
            .addCase(addTourBooking.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addTourBooking.fulfilled, (state, action) => {
                // state.listTours = [...state.listTours, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_TOURBOOKING';
            })
            .addCase(addTourBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
 

    },
})


export const { resetSuccess } = tourBookingSlice.actions;
export default tourBookingSlice.reducer

