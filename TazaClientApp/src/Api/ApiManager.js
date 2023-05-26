import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccessToken, getRefreshToken } from '../Storage/TokenStorage';

const instanceToken = axios.create({
  baseURL: 'http://192.168.31.151:8080/private',
});

const refreshAccessToken = async () => {
  try {
    const value = await getRefreshToken();
    const response = await axios.get(
      'http://192.168.31.151:8080/public/auth/token/refresh', 
      {
        headers: {
          'Authorization': 'Bearer ' + value
        }
      });
    await AsyncStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log('Error refreshing access tokenn:', error);
    
    throw error;
  }
};

instanceToken.interceptors.request.use(async function (config) {
  try {
    const value = await getAccessToken();
    config.headers['Authorization'] = `Bearer ${value}`;
    return config;
  } catch (error) {
    console.log('Error:', error);
    return config;
  }
});


instanceToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);



export default instanceToken;