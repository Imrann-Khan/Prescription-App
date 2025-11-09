import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Basic ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;