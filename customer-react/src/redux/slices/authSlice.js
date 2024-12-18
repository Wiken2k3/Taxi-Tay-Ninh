import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Async thunk để xử lý đăng nhập
export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authService.login(userData.email, userData.password);
            // Gọi API để lấy thông tin người dùng chi tiết
            if (response.statusCode===201){
                const userResponse = await authService.currentUser();
                return userResponse.data;
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

export const sendOtpPassword = createAsyncThunk(
    'auth/sendOtpPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await authService.sendOtpPassword(email);

            return response.data.email
        
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

export const confirmOtp = createAsyncThunk(
    'auth/confirmOtp',
    async (dataConfirmOtp, { rejectWithValue }) => {
        try {
            console.log(dataConfirmOtp)
            const response = await authService.confirmOtp(dataConfirmOtp);
            console.log(response)
            if(response.statusCode===201){
                return dataConfirmOtp.otp
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

export const confirmPassword = createAsyncThunk(
    'auth/confirmPassword',
    async (dataConfirmPassword, { rejectWithValue }) => {
        try {
            const response = await authService.confirmPassword(dataConfirmPassword);
 
            return response.data

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


// updateInfo, updatePassword
export const updateInfo = createAsyncThunk(
    'auth/updateInfo',
    async ({id, infoData}, { rejectWithValue }) => {
        try {
       
            const response = await authService.updateInfo(id, infoData);
            // Gọi API để lấy thông tin người dùng chi tiết
            if (response.statusCode === 200) {
                const userResponse = await authService.currentUser();
                return userResponse.data;
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

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async ({ id, passwordData }, { rejectWithValue }) => {
        try {

            const response = await authService.updatePassword(id, passwordData);
            // Gọi API để lấy thông tin người dùng chi tiết
            if (response.statusCode === 200) {
                const userResponse = await authService.currentUser();
                return userResponse.data;
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

export const register = createAsyncThunk(
    'auth/register',
    async (newUserData, { rejectWithValue }) => {
        try {
            return await authService.register(newUserData);
          

        } catch (error) {
            console.log(error)
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

// Async thunk để lấy thông tin người dùng hiện tại
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
            await authService.logout();
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
    currentUser: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    isLoggedIn: false,
    otpEmail: '',
    otpConfirm:'',
};

// Tạo slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //Đăng ký
            // Đăng nhập
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })

            // Đăng nhập
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentUser = action.payload; // Cập nhật thông tin người dùng
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
                state.isLoggedIn = false;
            })
            // Lấy thông tin người dùng hiện tại
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isLoggedIn = true;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isLoggedIn = false;
                state.currentUser = null; // Đặt lại thông tin người dùng khi lỗi
            })
            // Đăng xuất
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null; // Đặt lại thành null khi đăng xuất
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            // Update Info
            .addCase(updateInfo.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentUser = action.payload; // Cập nhật thông tin người dùng
                state.isLoggedIn = true;
            })
            .addCase(updateInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            // Update pass
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.currentUser = action.payload; // Cập nhật thông tin người dùng
                state.isLoggedIn = true;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            //Send otp
            .addCase(sendOtpPassword.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.otpConfirm=''
            })
            .addCase(sendOtpPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.otpEmail = action.payload; // Cập nhật thông tin người dùng
                // Thêm thông tin cần thiết vào state nếu có
            })
            .addCase(sendOtpPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
                state.otpConfirm = ''
            })
              //Confirm OTP
            .addCase(confirmOtp.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(confirmOtp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.otpConfirm = action.payload; // Cập nhật thông tin người dùng
                // Thêm thông tin cần thiết vào state nếu có
            })
            .addCase(confirmOtp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            //Confirm Password
            .addCase(confirmPassword.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(confirmPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.otpConfirm = ''
                state.otpEmail = ''
            })
            .addCase(confirmPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })

    },
});

export const { resetSuccess } = authSlice.actions;
export default authSlice.reducer;
