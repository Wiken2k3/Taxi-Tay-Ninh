import { toast } from 'react-toastify';
import instance from "../../api/api";
import newsService from "../../services/newsService";

class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
        this.uploadedImageUrl = null;
        this.associatedId = this.generateAssociatedId(); // Tạo associatedId ngẫu nhiên
    }

    generateAssociatedId() {
        return Math.random().toString(36).substr(2, 9);
    }

    async upload() {
        try {
            const file = await this.loader.file;
            const dataNews = {
                _id: this.associatedId,
                title: "hehe"
            }
            const response = await newsService.addNewsImageDescription(dataNews, file);
            const data = response.data;
         
            if (data.urls && data.urls.length > 0) {
                this.uploadedImageUrl = `${process.env.REACT_APP_NESTJS_APP_URL}${data.urls[0]}`;

                return {
                    default: this.uploadedImageUrl
                };
            } else {
                throw new Error('Dữ liệu phản hồi không chứa URLs');
            }
        } catch (error) {
            console.error('Upload failed:', error.response ? error.response.data : error.message);
            throw error; // Đảm bảo ném lỗi để Promise bị từ chối
        }
    }
  delete() {
        try {
            if (this.uploadedImageUrl) {
                console.log('Attempting to delete image with associatedId:', this.associatedId);
                const response =  newsService.deleteImageDescription('xp93co660');
                console.log('Delete response:', response);
                if (response.statusCode === 200) {
                    toast.success('Ảnh đã được xóa thành công');
                } else {
                    toast.error('Xóa ảnh không thành công ' + response.statusText);
                }
            }
        } catch (error) {
            console.error('Xóa ảnh thất bại:', error.response ? error.response.data : error.message);
            toast.error('Xóa ảnh thất bại: ' + (error.response ? error.response.data : error.message));
            throw error;
        }
    }

    abort() {
        // Handle abort
    }

    
}

function createUploadAdapter(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };
}

export default createUploadAdapter;
