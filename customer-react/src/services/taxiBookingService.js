import instance from "../api/api";

const fetchAllTaxiBookingCurrentUser = async (page, limit) => {
    return await instance.get(`/api/taxibooking/taxibooking-user?page=${page}&limit=${limit}`);
};



const addTaxiBooking = async (taxiBookingData) => {
    return await instance.post(`/api/taxibooking`, taxiBookingData);
};



export default {
    fetchAllTaxiBookingCurrentUser,addTaxiBooking
};