import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeAccessToken = async (value) => {
    try {
        await AsyncStorage.setItem('accessToken', value)
        console.log('accessToken', value)
    } catch (e) {
        console.log(error)
    }
}

export const storeRefreshToken = async (value) => {
    try {
        await AsyncStorage.setItem('refreshToken', value)
        console.log('refreshToken', value)
    } catch (e) {
        console.log(e)
    }
}


export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem('accessToken')
      } catch(e) {
        console.log('e', e)
      }
  }

  export const getRefreshToken = async () => {
    try {
        return await AsyncStorage.getItem('refreshToken')
    } catch(e) {
      console.error(e)
    }
  }

  export const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem('accessToken')
    } catch(e) {
        console.error(e)
    }
  }

  export const removeRefreshToken = async () => {
    try {
      await AsyncStorage.removeItem('refreshToken')
    } catch(e) {
        console.error(e)
    }
    console.log('Deleted')
  }