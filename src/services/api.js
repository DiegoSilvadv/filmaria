import axios from 'axios';

// https://sujeitoprogramador.com/r-api

const api = axios.create({
    baseURL: 'https://sujeitoprogramador.com'
});

export default api;