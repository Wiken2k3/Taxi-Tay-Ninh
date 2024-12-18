import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../../services/userService';


export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (userData, { rejectWithValue }) => {
        try{
            const users = await userService.fetchAllUsers(userData.page, userData.limit);
         
            return users.data;
            
        }
        catch (error){
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


export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await userService.addUser(userData.email, userData.password, userData.name, userData.phone, userData.role);
          
            return response.data; // Trả về dữ liệu khi thành công
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

export const updateUser = createAsyncThunk(
    'users/updateUser',

    async (userData, { rejectWithValue }) => {
        try {
            const response = await userService.updateUser(userData.id, userData.name, userData.phone, userData.role);

            return response.data; // Trả về dữ liệu khi thành công
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



export const deleteUser = createAsyncThunk(
    'users/deleteUser',

    async (userData, { rejectWithValue }) => {
        try {
         
            const response = await userService.deleteUser(userData.id);

            return response.data; // Trả về dữ liệu khi thành công
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

export const toggleBlockUser = createAsyncThunk(
    'users/toggleBlockUser',

    async (userData, { rejectWithValue }) => {
        try {
            if(userData.isBlock){
                const response = await userService.unblockUser(userData.id);
                return response.data; // Trả về dữ liệu khi thành công
            }
            else if (!userData.isBlock){
                const response = await userService.blockUser(userData.id);
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
    totalPages:0,   
    totalRows: 0,
    listUsers:[],
    isLoading:false,
    isError:false,
    isSuccess: false,
    errorMessage: '',
}
export const userSlice = createSlice({
        name: 'users',
        initialState,
        reducers: {
            // standard reducer logic, with auto-generated action types per reducer
            resetSuccess: (state) => {
                state.isSuccess = false;
                state.actionType='';
         
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(fetchAllUsers.pending, (state, action) => {
              
                state.isLoading = true
                state.isError= false
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {

                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listUsers = action.payload.user
                state.isLoading = false
                state.isError = false
                state.actionType = 'GET_USER';

            })
            .addCase(fetchAllUsers.rejected, (state, action) => {

                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })
            // Thêm user
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.listUsers = [...state.listUsers, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_USER';

            })
            .addCase(addUser.rejected, (state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage =  action.payload
                state.isSuccess = false;

            })
            // Cập nhập User
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.listUsers = state.listUsers.map(user =>
                    user._id === action.payload._id ? action.payload : user
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess=true
                state.actionType = 'UPDATE_USER';


            })
                .addCase(updateUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

                // Khoá/ Mở khoá
                .addCase(toggleBlockUser.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                })
                .addCase(toggleBlockUser.fulfilled, (state, action) => {
                    state.listUsers = state.listUsers.map(user =>
                        user._id === action.payload._id ? action.payload : user
                    );
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true
                    state.actionType = 'ACTIVE_USER';


                })
                .addCase(toggleBlockUser.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                })

            // Xoá User
             .addCase(deleteUser.pending, (state) => {
                 state.isLoading = true;
                 state.isError = false;
             })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.listUsers = state.listUsers.filter(user => user._id !== action.payload._id);
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.actionType = 'DELETE_USER';
            
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.actionType = ''; 
            })

        },
    })


export const { resetSuccess } = userSlice.actions;
export default userSlice.reducer

