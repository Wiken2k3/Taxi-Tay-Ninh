import instance from "../api/api";

const register = async (newUserData) => {
    return await instance.post('/api/auth/register', newUserData);
}

const login = async (email, password) => {
    return await instance.post('/api/auth/login', { email, password });

}

const sendOtpPassword = async (email) => {
    return await instance.post('/api/auth/send-otp', {email});

}
const confirmOtp = async (dataConfirmOtp) => {
    return await instance.post('/api/auth/confirm-otp', dataConfirmOtp);

}

const confirmPassword = async (dataConfirmPassword) => {
    return await instance.post('/api/auth/confirm-password', dataConfirmPassword);

}


const logout = async () => {
    return await instance.get('/api/auth/logout');
}


const currentUser = async () => {
    return await instance.get('/api/auth/current-user');
}

const updateInfo = async (id,infoData) => {
    return await instance.put(`/api/user/${id}`, infoData);

}
const updatePassword = async (id, passwordData) => {
    return await instance.patch(`/api/user/${id}`, passwordData);

}







export default {
    register, login, logout, currentUser, updateInfo, updatePassword, sendOtpPassword, confirmOtp, confirmPassword
};