import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import paymentService from '../../services/paymentService';
import { Status } from '../../enums/status.enum';



export const fetchAllPayment = createAsyncThunk(
    'payment/fetchAllPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            const payment = await paymentService.fetchAllPayment(paymentData.page, paymentData.limit);
            return payment.data;

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
    totalPages: 0,
    totalRows: 0,
    listPayment: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
}
export const paymentSlice = createSlice({
    name: 'payment',
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
            .addCase(fetchAllPayment.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllPayment.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listPayment = action.payload.payments;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_PAYMENT';

            })
            .addCase(fetchAllPayment.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

        

    },
})


export const { resetSuccess } = paymentSlice.actions;
export default paymentSlice.reducer

