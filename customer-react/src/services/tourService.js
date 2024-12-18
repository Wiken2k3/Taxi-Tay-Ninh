import instance from "../api/api";


const fetchAllTours = async (page, limit) => {
    return await instance.get(`/api/tour/?page=${page}&limit=${limit}`);


};

const fetchTourHot= async (top) => {
    return await instance.get(`/api/tour/tour-hot?top=${top}`);


};




export default {
    fetchAllTours, fetchTourHot
};