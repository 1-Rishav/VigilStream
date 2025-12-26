import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vigilstream.onrender.com/api',
    withCredentials: true,
});

export default instance;
