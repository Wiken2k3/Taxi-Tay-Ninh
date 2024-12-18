import axios from "axios";
import { toast } from 'react-toastify'; // Import toast từ react-toastify

const instance = axios.create({
    baseURL: process.env.REACT_APP_NESTJS_APP_URL,
    withCredentials: true,
});

// Xử lý phản hồi từ server
instance.interceptors.response.use(
    function (response) {
        // Trả về dữ liệu phản hồi
        return response.data;
    },
    function (error) {
        // Xử lý lỗi khi phản hồi không thành công
        if (error.response) {
            // Nếu phản hồi có lỗi
            if (error.response.status === 401) {
                // Xử lý lỗi 401 - Unauthorized
                // if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
                //     window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
                // }
          
            } else if (error.response.status === 404) {
                // Xử lý lỗi 404 - Not Found
                toast.error("Không tìm thấy tài nguyên.");
            } else if (error.response.status === 500) {
                // Xử lý lỗi 500 - Internal Server Error
                toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
            } else {
                // Xử lý các lỗi khác

            }
        } else if (error.request) {
            // Xử lý lỗi khi không nhận được phản hồi
            toast.error("Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối mạng.");
        } else {
            // Xử lý lỗi khi thiết lập yêu cầu
            toast.error(`Lỗi: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default instance;
