import instance from "../api/api";


const fetchAllNews = async (page, limit) => {
    return await instance.get(`/api/news?page=${page}&limit=${limit}`);


};


const fetchNewsId = async (id) => {
    return await instance.get(`/api/news/${id}`);
};





export default {
    fetchAllNews, fetchNewsId
};