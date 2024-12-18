import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import taxiBookingService from '../../services/taxiBookingService';
import paymentService from '../../services/paymentService';
import { PaymentType } from '../../enums/payment.enums';



// export const fetchAllTaxiBookingCurrentUser = createAsyncThunk(
//     'taxiBooking/fetchAllTaxiBookingCurrentUser',
//     async ({ page, limit }, { rejectWithValue }) => {
//         try {
//             const taxiBooking = await taxiBookingService.fetchAllTaxiBookingCurrentUser(page, limit);
//             return taxiBooking.data;

//         }
//         catch (error) {
//             return rejectWithValue(error.response.data.message || 'Something went wrong');
//         }

//     }
// )

export const fetchAllTaxiBookingCurrentUser = createAsyncThunk(
    'taxiBooking/fetchAllTaxiBookingCurrentUser',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const taxiBooking = await taxiBookingService.fetchAllTaxiBookingCurrentUser(page, limit);
            return taxiBooking.data;

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

export const addTaxiBooking = createAsyncThunk(
    'taxiBooking/addTaxiBooking',
    async (taxiBookingData, { rejectWithValue }) => {
        try {

            const taxiBooking = await taxiBookingService.addTaxiBooking(taxiBookingData); // Truyền đối tượng tourData
            const dataTourBooking = taxiBooking.data
            if (dataTourBooking.paymentMethods === PaymentType.VNPAY) {
                const paymentData = {
                    taxiBookingId: dataTourBooking._id,
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

            return taxiBooking.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || 'Something went wrong');
        }
    }
);






const initialState = {
    totalPages: 0,
    totalRows: 0,
    listTaxiBooking: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    actionType:'',
}
export const taxiBookingSlice = createSlice({
    name: 'taxiBooking',
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
            .addCase(fetchAllTaxiBookingCurrentUser.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllTaxiBookingCurrentUser.fulfilled, (state, action) => {
                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listTaxiBooking = action.payload.taxiBooking;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_TAXIBOOKING';

            })
            .addCase(fetchAllTaxiBookingCurrentUser.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })


            .addCase(addTaxiBooking.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addTaxiBooking.fulfilled, (state, action) => {
                // state.listTours = [...state.listTours, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_TAXIBOOKING';
            })
            .addCase(addTaxiBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
          


    },
})


export const { resetSuccess } = taxiBookingSlice.actions;
export default taxiBookingSlice.reducer

