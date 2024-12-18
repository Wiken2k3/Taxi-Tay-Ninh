import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newsService from '../../services/newsService';

// Các async thunks
export const fetchAllNews= createAsyncThunk(
    'news/fetchAllNews',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const news = await newsService.fetchAllNews(page, limit);
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


export const fetchNewsId = createAsyncThunk(
    'news/fetchNewsId',
    async (id, { rejectWithValue }) => {
        try {
            const news = await newsService.fetchNewsId(id);

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



// Khởi tạo state ban đầu
const initialState = {
    totalPages: 0,
    totalRows: 0,
    listNews: [],
    newsId:[],
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
            // Fetch all 
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
            // Fetch ID
            .addCase(fetchNewsId.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchNewsId.fulfilled, (state, action) => {
                state.newsId = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.actionType = 'GET_NEWSID';
            })
            .addCase(fetchNewsId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
          
    },
});

export const { resetSuccess } = newsSlice.actions;
export default newsSlice.reducer;
