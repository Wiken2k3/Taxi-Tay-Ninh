import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Async thunk để xử lý đăng nhập và lấy thông tin người dùng
export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            return await authService.login(userData.email, userData.password);

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


export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.currentUser();
            return response.data;
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

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout(); // Gọi API logout
            return {}; // Return empty object on success
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

// Khởi tạo state ban đầu
const initialState = {
    currentUser: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    isLoggedIn: false,

};

// Tạo slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
            state.actionType = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.actionType ="LOGIN_USER"
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            // Fetch current user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isLoggedIn = false;

            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isLoading = false;
                state.isSuccess= true;
                state.isError = false;
                state.isLoggedIn = true;

            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isLoggedIn = false;

            })

            // logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.isLoading = false;
                state.isSuccess = true;
                state.actionType = 'LOGOUT_USER';
                state.isLoggedIn=false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false; 
                   
            });
    },
});

export const { resetSuccess } = authSlice.actions;
export default authSlice.reducer;
