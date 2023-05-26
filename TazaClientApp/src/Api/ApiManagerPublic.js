import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://192.168.31.151:8080/public',
});
