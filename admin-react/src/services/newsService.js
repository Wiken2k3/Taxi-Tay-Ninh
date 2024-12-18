import instance from "../api/api";


const fetchAllNews= async (page, limit) => {
    return await instance.get(`/api/news/?page=${page}&limit=${limit}`);

};



const addNews = async (title, summary, images, description) => {

    const news = await instance.post('/api/news/', { title, summary, description });
    console.log(news)
    const newsData = news.data

    if (images) {
        await addNewsImage(newsData, images)
    }
    return news
}

const addNewsImage = async (news, images) => {

    const formData = new FormData();
    formData.append('files', images);
    formData.append('associatedId', news._id);
    formData.append('alt', news.title);
    formData.append('type', "News");
    return await instance.post(`/api/images/upload-news`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const addNewsImageDescription = async (news, images) => {

    const formData = new FormData();
    formData.append('files', images);
    formData.append('associatedId', news._id);
    formData.append('alt', news.title);
    formData.append('type', "News");
    return await instance.post(`/api/images/upload-newsdescription`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const updateNews = async (id, title, summary, images, description) => {
    const news = await instance.patch(`/api/news/${id}`, { title, summary, description });
    const newsData = news.data
    if (images) {

        await instance.delete(`/api/images/${newsData._id}`);

        await addNewsImage(newsData, images)
    }
    return news

};

const deleteNews = async (id) => {
    try {

        return await instance.delete(`/api/news/${id}`);


    } catch (error) {

    }
};

const deleteImageDescription = async (associatedId) => {
    try {

        return await instance.delete(`/api/images/${associatedId}`);


    } catch (error) {

    }
};




export default {
    fetchAllNews, addNews, updateNews, deleteNews, addNewsImage, addNewsImageDescription, deleteImageDescription
};