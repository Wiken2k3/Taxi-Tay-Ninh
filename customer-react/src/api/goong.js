import axios from 'axios';

const goongApi = axios.create({
    baseURL: process.env.REACT_APP_GOONGIO_URL, // URL của Goong API
});

export default goongApi;
