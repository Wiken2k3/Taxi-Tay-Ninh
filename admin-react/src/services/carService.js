import instance from "../api/api";


const fetchAllCar = async (page, limit) => {
    return await instance.get(`/api/car?page=${page}&limit=${limit}`);


};




const addCar = async (carData) => {
   
    return await instance.post('/api/car/', carData);


}



const updateCar = async (id, carUpdateData) => {
  
    return await instance.patch(`/api/car/${id}`, carUpdateData);


};



const deleteCar = async (id) => {
    try {

        return await instance.delete(`/api/car/${id}`);


    } catch (error) {

    }
};


export default {
    fetchAllCar, addCar, updateCar, deleteCar,
};