import axios from 'axios';


export const instance = axios.create({
    baseURL: 'http://10.121.219.147:8080',
});