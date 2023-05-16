import axios from 'axios';


export const instance = axios.create({
    // baseURL: 'http://10.0.2.2:8080/',
    baseURL: 'http://192.168.31.156:8080',
});