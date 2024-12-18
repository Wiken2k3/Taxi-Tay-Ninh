import instance from "../api/api";


const login = async (email, password) => {
    return await instance.post('/api/auth/login', { email, password });

}

const logout = async () => {
    return await instance.get('/api/auth/logout');
}

const currentUser = async () => {
    return await instance.get('/api/auth/current-user');
}



export default {
    login, logout, currentUser
};