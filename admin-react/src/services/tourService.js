import instance from "../api/api";


const fetchAllTours = async (page, limit) => {
    return await instance.get(`/api/tour/?page=${page}&limit=${limit}`);


};


const addTour = async (tourData, imagesData) => {
    console.log(tourData)
    const tour = await instance.post('/api/tour/', tourData);
   
    if (imagesData){
        await addTourImage(tour.data, imagesData)
    }
    return tour
}

// const addTour = async (title, location, price1, images) => {
//     const price = Number(price1);

//     const tour = await instance.post('/api/tour/', { title, location, price });
//     const tourData = tour.data

//     if (images){
//         await addTourImage(tourData, images)
//     }
//     return tour
// }

const addTourImage = async (tour, images) => {
   
    const formData = new FormData();
    
    if (images){
        images.forEach((image) => {
            formData.append('files', image);
        });
    }
    formData.append('associatedId', tour._id);
    formData.append('alt', tour.location);
    formData.append('type', "Tour");
    return await instance.post(`/api/images/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}


const updateTour = async (id, dataTour, imagesData) => {

    const tour = await instance.patch(`/api/tour/${id}`, dataTour );
    const tourData = tour.data
    if (imagesData){
     
        await instance.delete(`/api/images/${tourData._id}`);
      
        await addTourImage(tourData, imagesData)
    }
    return tour
   
};

const deleteTour = async (id) => {
    try {

        return await instance.delete(`/api/tour/${id}`);
  

    } catch (error) {
    
    }
};


export default {
    fetchAllTours, addTour, updateTour, deleteTour
};