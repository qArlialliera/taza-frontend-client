import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getAccessToken = async () => {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (e) {
      console.log('Error:', e);
    }
  };
  
  const instanceToken = axios.create({
    baseURL: 'http://192.168.31.151:8080/private',
  });
  
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
  
  export default instanceToken;