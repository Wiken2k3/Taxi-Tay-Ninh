import instance from "../api/api";


const fetchAllContact = async (page, limit) => {
    return await instance.get(`/api/contact?page=${page}&limit=${limit}`);
};



const approveContact = async (id) => {
    return await instance.patch(`/api/contact/${id}/approve`);
};
const rejectContact = async (id) => {
    return await instance.patch(`/api/contact/${id}/reject`);
};



export default {
    fetchAllContact, approveContact, rejectContact
};