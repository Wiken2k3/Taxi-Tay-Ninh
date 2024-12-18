import instance from "../api/api";


const fetchAllCommentApprove = async () => {
    return await instance.get(`api/comment/approved`);
};




const addComment = async (commentData) => {
    return await instance.post(`/api/comment/`, commentData);
};
const rejectComment = async (id) => {
    return await instance.patch(`/api/comment/${id}/reject`);
};

const fetchAllCommentCurrentUser = async (page, limit) => {
    return await instance.get(`/api/comment/comment-user?page=${page}&limit=${limit}`);
};


const UpdateCommentCurrentUser = async (id,commentData) => {
    return await instance.patch(`/api/comment/${id}`, commentData);
};


const DeleteCommentCurrentUser = async (id) => {
    return await instance.delete(`/api/comment/${id}`);
};










export default {
    fetchAllCommentApprove, addComment, rejectComment, fetchAllCommentCurrentUser, UpdateCommentCurrentUser, DeleteCommentCurrentUser
};