import instance from "../api/api";


const fetchAllUsers = async (page , limit ) => {
    return await instance.get(`/api/user/all?page=${page}&limit=${limit}`);
   

};


const addUser = async (email, password, name, phone,role) => {
    return await instance.post('/api/user/createUser', { email, password, name, phone, role });
}

const updateUser = async (id, name, phone, role) => {
    return await instance.patch(`/api/user/${id}`, { name, phone, role });
};
const deleteUser = async (id) => {
    return await instance.delete(`/api/user/${id}`);
};

const blockUser = async (id) => {
    return await instance.patch(`/api/user/${id}/block`);
};
const unblockUser = async (id) => {
    return await instance.patch(`/api/user/${id}/unblock`);
};



export default {
    fetchAllUsers, addUser, updateUser, deleteUser, blockUser, unblockUser
};