import instance from "../api/api";


const fetchAllTaxiBooking = async (page, limit) => {
    return await instance.get(`/api/taxibooking?page=${page}&limit=${limit}`);
};




const approveTaxiBooking = async (id) => {
    return await instance.patch(`/api/taxibooking/${id}/approve`);
};
const rejectTaxiBooking = async (id) => {
    return await instance.patch(`/api/taxibooking/${id}/reject`);
};



export default {
    fetchAllTaxiBooking, approveTaxiBooking, rejectTaxiBooking
};