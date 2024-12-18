import instance from "../api/api";




const addTourBooking = async (tourBookingData) => {
    return await instance.post(`/api/tourbooking`, tourBookingData);
};

const fetchAllTourBookingCurrentUser = async (page, limit) => {
    return await instance.get(`/api/tourbooking/tourbooking-user?page=${page}&limit=${limit}`);
};


export default {
    addTourBooking, fetchAllTourBookingCurrentUser
};