import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import contactService from '../../services/contactService';
import { StatusContact } from '../../enums/contact.enum';



export const fetchAllContact= createAsyncThunk(
    'contact/fetchAllContact',
    async (contactData, { rejectWithValue }) => {
        try {
            const contact = await contactService.fetchAllContact(contactData.page, contactData.limit);
            return contact.data;

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





export const toggleContact = createAsyncThunk(
    'contact/toggleContact',

    async (contactData, { rejectWithValue }) => {
        try {
            if (contactData.action === StatusContact.APPROVED) {
                const response = await contactService.approveContact(contactData.id);
                return response.data; // Trả về dữ liệu khi thành công
            }
            else if (contactData.action === StatusContact.REJECTED) {
                const response = await contactService.rejectContact(contactData.id);
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
    listContact: [],
    countPendingContact: 0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
}
export const contactSlice = createSlice({
    name: 'contact',
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
            .addCase(fetchAllContact.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllContact.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listContact = action.payload.contacts;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_CONTACT';

            })
            .addCase(fetchAllContact.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })
            // Get count



            // Khoá/ Mở khoá
            .addCase(toggleContact.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(toggleContact.fulfilled, (state, action) => {
                state.listContact = state.listContact.map(contact =>
                    contact._id === action.payload._id ? action.payload : contact
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true
                state.actionType = 'ACTIVE_CONTACT';


            })
            .addCase(toggleContact.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })



    },
})


export const { resetSuccess } = contactSlice.actions;
export default contactSlice.reducer

