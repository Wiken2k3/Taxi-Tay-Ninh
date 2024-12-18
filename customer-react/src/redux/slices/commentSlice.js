import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commentService from '../../services/commentService';



export const fetchAllCommentApprove = createAsyncThunk(
    'comment/fetchAllCommentApprove',
    async (_, { rejectWithValue }) => {
        try {
            const comment = await commentService.fetchAllCommentApprove();
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

export const addComment = createAsyncThunk(
    'comment/addComment',
    async (commentData, { rejectWithValue }) => {
        try {

            const comment = await commentService.addComment(commentData); // Truyền đối tượng tourData
            return comment.data;
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


export const fetchAllCommentCurrentUser = createAsyncThunk(
    'comment/fetchAllCommentCurrentUser',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const comment = await commentService.fetchAllCommentCurrentUser(page, limit);
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

export const UpdateCommentCurrentUser = createAsyncThunk(
    'comment/UpdateCommentCurrentUser',
    async (commentData , { rejectWithValue }) => {
        try {
            const comment = await commentService.UpdateCommentCurrentUser(commentData.id, commentData.dataComment);
   
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
export const DeleteCommentCurrentUser = createAsyncThunk(
    'comment/DeleteCommentCurrentUser',
    async (id, { rejectWithValue }) => {
        try {
            const comment = await commentService.DeleteCommentCurrentUser(id);
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









const initialState = {
    totalPages: 0,
    totalRows: 0,
    listCommentApprove: [],
    listCommentCurrentUser:[],
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
            .addCase(fetchAllCommentApprove.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllCommentApprove.fulfilled, (state, action) => {
                state.listCommentApprove = action.payload;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_COMMENT_APPROVE';

            })
            .addCase(fetchAllCommentApprove.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })
            //Fetch comment Current User
            .addCase(fetchAllCommentCurrentUser.pending, (state, action) => {

                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllCommentCurrentUser.fulfilled, (state, action) => {
                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listCommentCurrentUser = action.payload.comments;
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_COMMENT_CURRENTUSER';

            })
            .addCase(fetchAllCommentCurrentUser.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })

            //ADD
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.listCommentCurrentUser = [...state.listCommentCurrentUser, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_COMMENT';
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            //UPDATE
            .addCase(UpdateCommentCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(UpdateCommentCurrentUser.fulfilled, (state, action) => {
                state.listCommentCurrentUser = state.listCommentCurrentUser.map(comment =>
                    comment._id === action.payload._id ? action.payload : comment
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'UPDATE_COMMENT';
            })
            .addCase(UpdateCommentCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            // DELETE
            .addCase(DeleteCommentCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(DeleteCommentCurrentUser.fulfilled, (state, action) => {
                state.listCommentCurrentUser = state.listCommentCurrentUser.filter(comment => comment._id !== action.payload._id);
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'DELETE_COMMENT';
            })
            .addCase(DeleteCommentCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload;

            });

            


    },
})


export const { resetSuccess } = commentSlice.actions;
export default commentSlice.reducer

