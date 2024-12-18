import instance from "../api/api";


const fetchAllPayment = async (page, limit) => {
    return await instance.get(`/api/payment?page=${page}&limit=${limit}`);
};




export default {
    fetchAllPayment
};