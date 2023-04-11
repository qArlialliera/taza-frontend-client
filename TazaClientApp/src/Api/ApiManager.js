import axios from 'axios';


export const instance = axios.create({
    baseURL: 'http://10.121.219.152:8080',
    // baseURL: 'http://192.168.31.145:8080',
});