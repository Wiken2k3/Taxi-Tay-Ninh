import instance from "../api/api";


const fetchAllCar = async (page, limit) => {
    return await instance.get(`/api/car?page=${page}&limit=${limit}`);


};
const pricingCar = async (carType, distance) => {
    return await instance.get(`/api/car/pricing?carType=${carType}&distance=${distance}`);

};


export default {
    fetchAllCar, pricingCar
}