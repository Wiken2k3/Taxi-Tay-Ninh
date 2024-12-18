import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newsService from '../../services/newsService';

// Các async thunks
export const fetchAllNews= createAsyncThunk(
    'news/fetchAllNews',
    async (newsData, { rejectWithValue }) => {
        try {
            const news = await newsService.fetchAllNews(newsData.page, newsData.limit);
          
            return news.data;
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

export const addNews = createAsyncThunk(
    'news/addNews',
    async (newsData, { rejectWithValue }) => {
        try {

            const response = await newsService.addNews(newsData.title, newsData.summary, newsData.images, newsData.description);
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

export const updateNews = createAsyncThunk(
    'news/updateNews',
    async (newsData, { rejectWithValue }) => {

        try {
            const response = await newsService.updateNews(newsData.id, newsData.title, newsData.summary, newsData.images, newsData.description);
            console.log(response)
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

export const deleteNews = createAsyncThunk(
    'news/deleteNews',
    async (newsData, { rejectWithValue }) => {
        try {
            await newsService.deleteNews(newsData.id);

            return { id: newsData.id };
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
    listNews: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    actionType:'',
};

// Tạo slice
export const newsSlice = createSlice({
    name: 'news',
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
            .addCase(fetchAllNews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllNews.fulfilled, (state, action) => {
                state.totalRows = action.payload.totalRows;
                state.totalPages = action.payload.totalPages;
                state.listNews = action.payload.news;
                state.isLoading = false;
                state.isError = false;
                state.actionType = 'GET_NEWS';
            })
            .addCase(fetchAllNews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            // Add tour
            .addCase(addNews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addNews.fulfilled, (state, action) => {
                state.listNews = [...state.listNews, action.payload];
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'ADD_NEWS';
            })
            .addCase(addNews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.isSuccess = false;
            })
            // Update tour
            .addCase(updateNews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateNews.fulfilled, (state, action) => {
                state.listNews = state.listNews.map(neww =>
                    neww._id === action.payload._id ? action.payload : neww
                );
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'UPDATE_NEWS';
            })
            .addCase(updateNews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            // Delete tour
            .addCase(deleteNews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.listNews = state.listNews.filter(neww => neww._id !== action.payload._id);
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.actionType = 'DELETE_NEWS';
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.actionType = '';
            });
    },
});

export const { resetSuccess } = newsSlice.actions;
export default newsSlice.reducer;
