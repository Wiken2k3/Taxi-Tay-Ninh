import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import carService from '../../services/carService';

// Các async thunks
export const fetchAllCar = createAsyncThunk(
    'cars/fetchAllCar',
    async (carData, { rejectWithValue }) => {
        try {
            const cars = await carService.fetchAllCar(carData.page, carData.limit);
            return cars.data;
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

export const addCar = createAsyncThunk(
    'cars/addCar',
    async (carData, { rejectWithValue }) => {
        try {

            const response = await carService.addCar(carData);
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

export const updateCar = createAsyncThunk(
    'cars/updateCar',
    async (carData, { rejectWithValue }) => {

        try {
            const response = await carService.updateCar(carData.id, carData.carUpdateData);
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

export const deleteCar = createAsyncThunk(
    'cars/deleteCar',
    async (carData, { rejectWithValue }) => {
        try {
            await carService.deleteCar(carData.id);

            return { id: carData.id };
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
    totalPages: 0,
    totalRows: 0,
    listCars: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
};

// Tạo slice
export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
            state.actionType = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all tours
            .addCase(fetchAllCar.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllCar.fulfilled, (state, action) => {
                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listCars = action.payload.cars;
                state.isLoading = false;
                state.isError = false;
                state.actionType = 'GET_CAR';
            })
            .addCase(fetchAllCar.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            // Add tour
            .addCase(addCar.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.listCars = [...state.listCars, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_CAR';
            })
            .addCase(addCar.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            // Update tour
            .addCase(updateCar.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                state.listCars = state.listCars.map(car =>
                    car._id === action.payload._id ? action.payload : car
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'UPDATE_CAR';
            })
            .addCase(updateCar.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            // Delete tour
            .addCase(deleteCar.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.listCars = state.listCars.filter(car => car._id !== action.payload._id);
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'DELETE_CAR';
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    },
});

export const { resetSuccess } = carSlice.actions;
export default carSlice.reducer;
