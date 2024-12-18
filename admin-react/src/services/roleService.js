import instance from "../api/api";


const fetchAllRoles = async () => {
    return await instance.get(`/api/roles`);


};


const updateRole = async (roleName, permissions) => {
    return await instance.put(`/api/roles/${roleName}`, { name: roleName, permissions });
};

export default {
    fetchAllRoles, updateRole
};