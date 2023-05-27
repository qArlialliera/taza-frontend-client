import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeRole = async (value) => {
    try {
        await AsyncStorage.setItem('role', value)
    } catch (e) {
        console.log(error)
    }
}

export const getRole = async () => {
    try {
        return await AsyncStorage.getItem('role')
      } catch(e) {
        console.log(e)
      }
  }

  export const removeRole = async () => {
    try {
      await AsyncStorage.removeItem('role')
    } catch(e) {
        console.error(e)
    }
  }