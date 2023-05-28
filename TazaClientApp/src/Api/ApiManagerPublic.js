import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://concerned-growth-production.up.railway.app/public',
});
