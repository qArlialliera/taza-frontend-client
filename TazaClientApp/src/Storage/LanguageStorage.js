import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLanguage = async (value) => {
    try {
        await AsyncStorage.setItem('language', value)
        console.log('language - ', value)
    } catch (e) {
        console.log(error)
    }
}

export const getLanguage = async () => {
    try {
        return await AsyncStorage.getItem('language')
      } catch(e) {
        console.log(e)
      }
  }

  export const removeLanguage = async () => {
    try {
      await AsyncStorage.removeItem('language')
    } catch(e) {
        console.error(e)
    }
  }