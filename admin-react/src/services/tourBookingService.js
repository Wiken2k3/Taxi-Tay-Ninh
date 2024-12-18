import instance from "../api/api";


const fetchAllTourBooking = async (page, limit) => {
    return await instance.get(`/api/tourbooking?page=${page}&limit=${limit}`);
};




const approveTourBooking = async (id) => {
    return await instance.patch(`/api/tourbooking/${id}/approve`);
};
const rejectTourBooking = async (id) => {
    return await instance.patch(`/api/tourbooking/${id}/reject`);
};



export default {
    fetchAllTourBooking, approveTourBooking, rejectTourBooking
};