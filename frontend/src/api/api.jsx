import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/', // url do backend
});

// Adiciona token JWT automaticamente nas requisições

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api;