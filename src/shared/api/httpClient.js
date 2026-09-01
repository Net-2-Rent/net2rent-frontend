import axios from 'axios';
import { getToken, clearSession } from '../../features/auth/services/authStorage'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json'},
});

httpClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearSession();
            if (!window.location.pathname.startsWith('/login')) {
                window.location.assign('/login');
            }
        }
        return Promise.reject(error);
    },
);

export default httpClient