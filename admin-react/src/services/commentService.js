import instance from "../api/api";


const fetchAllComment = async (page, limit) => {
    return await instance.get(`/api/comment?page=${page}&limit=${limit}`);
};




const approveComment = async (id) => {
    return await instance.patch(`/api/comment/${id}/approve`);
};
const rejectComment = async (id) => {
    return await instance.patch(`/api/comment/${id}/reject`);
};




export default {
    fetchAllComment, approveComment, rejectComment
};