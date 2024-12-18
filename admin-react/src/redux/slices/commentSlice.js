import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Status } from '../../enums/status.enum';
import commentService from '../../services/commentService';



export const fetchAllComment = createAsyncThunk(
    'comment/fetchAllComment',
    async (commentData, { rejectWithValue }) => {
        try {
            const comment = await commentService.fetchAllComment(commentData.page, commentData.limit);
            return comment.data;

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

export const fetchCountPendingComment = createAsyncThunk(
    'comment/fetchCountPendingComment',
    async (_, { rejectWithValue }) => {
        try {
            const comment = await commentService.fetchCountPending();
            return comment.data;

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




export const toggleComment = createAsyncThunk(
    'comment/toggleComment',

    async (commentData, { rejectWithValue }) => {
        try {
            if (commentData.action === Status.APPROVED) {
                const response = await commentService.approveComment(commentData.id);
                return response.data; // Trả về dữ liệu khi thành công

            }
            else if (commentData.action === Status.REJECTED) {
                const response = await commentService.rejectComment(commentData.id);
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
    listComment: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
}
export const commentSlice = createSlice({
    name: 'comment',
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
            .addCase(fetchAllComment.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllComment.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listComment = action.payload.comments;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_COMMENT';

            })
            .addCase(fetchAllComment.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            // Khoá/ Mở khoá
            .addCase(toggleComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(toggleComment.fulfilled, (state, action) => {
                state.listComment = state.listComment.map(comment =>
                    comment._id === action.payload._id ? action.payload : comment
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true
                state.actionType = 'ACTIVE_COMMENT';


            })
            .addCase(toggleComment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            // Get count
            .addCase(fetchCountPendingComment.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchCountPendingComment.fulfilled, (state, action) => {

                state.countPendingComment = action.payload;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_COUNTCOMMENT';

            })
            .addCase(fetchCountPendingComment.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })



    },
})


export const { resetSuccess } = commentSlice.actions;
export default commentSlice.reducer

