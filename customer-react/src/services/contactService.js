import instance from "../api/api";


const addContact = async (dataContact) => {
    return await instance.post(`/api/contact`, dataContact);


};



export default {
    addContact,
}