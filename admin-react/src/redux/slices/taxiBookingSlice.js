import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import taxiBookingService from '../../services/taxiBookingService';
import { Status } from '../../enums/status.enum';



export const fetchAllTaxiBooking = createAsyncThunk(
    'taxiBooking/fetchAllTaxiBooking',
    async (taxiData, { rejectWithValue }) => {
        try {
            const taxiBooking = await taxiBookingService.fetchAllTaxiBooking(taxiData.page, taxiData.limit);
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




export const toggleTaxi = createAsyncThunk(
    'taxiBooking/toggleTaxi',

    async (taxiData, { rejectWithValue }) => {
        try {
            if (taxiData.action === Status.APPROVED) {
                const response = await taxiBookingService.approveTaxiBooking(taxiData.id);
                return response.data; // Trả về dữ liệu khi thành công
                
            }
            else if (taxiData.action === Status.REJECTED) {
                const response = await taxiBookingService.rejectTaxiBooking(taxiData.id);
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
    listTaxiBooking: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
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
            .addCase(fetchAllTaxiBooking.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllTaxiBooking.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listTaxiBooking = action.payload.taxiBooking;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_TAXIBOOKING';

            })
            .addCase(fetchAllTaxiBooking.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            // Khoá/ Mở khoá
            .addCase(toggleTaxi.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(toggleTaxi.fulfilled, (state, action) => {
                state.listTaxiBooking = state.listTaxiBooking.map(taxiBooking =>
                    taxiBooking._id === action.payload._id ? action.payload : taxiBooking
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true
                state.actionType = 'ACTIVE_TAXIBOOKING';


            })
            .addCase(toggleTaxi.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })



    },
})


export const { resetSuccess } = taxiBookingSlice.actions;
export default taxiBookingSlice.reducer

