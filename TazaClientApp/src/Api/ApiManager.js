import axios from 'axios';


export const instance = axios.create({
    baseURL: 'http://10.121.218.112:8080',
});