import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, Image } from 'react-native'
import { styles } from '../../../styles/Styles'
import { getAccessToken } from '../../../Storage/TokenStorage';
import { instance } from '../../../Api/ApiManager';

export const Messages = ({ navigation }) => {

  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const DATA = [
    { id: 1, name: 'Company X', img: require('../../../Assets/images/newimg.png'), last: 'Hello, I wanted to...' },
    { id: 2, name: 'CompanyPOST', img: require('../../../Assets/images/newimg.png'), last: 'Hello, I your booking...' },
    { id: 3, name: 'BestPrice', img: require('../../../Assets/images/newimg.png'), last: 'Hello, I wanted to...' }
  ]

  const adminItem = {
    id: 6,
    name: "admin",
    password: "$2a$10$.3Ma5IVgpNj3vCPgjfEqmeXxBgM3WsUiavaqXqmb1RMyIbbYLa0CK",
    fullName: "admin",
    email: "admin",
    city: "Astana",
    address: "admin",
    phoneNumber: null,
    photo: null,
    reviews: [],
    orders: []
  }


  const [userData, setUserData] = useState('');

  useEffect(() => {
    readItemFromStorage()
    instance.get('private/user/user-details', config).then(function (response) {
      setUserData(response.data)
    }).catch(function (error) {
      console.log(error);
    });

  }, [token])



  return (
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.back}>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 30 }}>Messages</Text>
        </View>
        <SafeAreaView style={styles.container_messages}>


          <FlatList
            data={DATA}
            renderItem={
              ({ item }) => (
                <View key={item.id} >
                  <TouchableOpacity style={{ width: '100%', flexDirection: 'row', height: 90, alignItems: 'center', }}
                    onPress={() => navigation.navigate("Massages_Chat", { item, userData, token })}>
                    <Image source={item.img} style={styles.image_card_m} resizeMode="cover" />
                    <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 20, width: '70%' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontFamily: 'Nunito-Black', fontSize: 20 }}>{item.name}</Text>
                        <Text style={{ color: '#A8A8A8', fontFamily: 'Nunito-Regular', fontSize: 15 }}>23:34</Text>
                      </View>
                      <Text style={{ color: '#A8A8A8', fontFamily: 'Nunito-Regular', fontSize: 15 }}>{item.last}</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              )
            }
          />


          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', height: 90, alignItems: 'center', borderColor: '#C414C60', borderWidth: 1, borderRadius: 10, backgroundColor: '#8E9AAF' }}
            onPress={() => navigation.navigate("Massages_Chat", { item: adminItem, userData, token})}>
            <Image source={require('../../../Assets/images/newimg.png')} style={styles.image_card_m} resizeMode="cover" />
            <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 20, width: '70%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white', fontFamily: 'Nunito-Black', fontSize: 20 }}>Send message to admins</Text>
              </View>
              <Text style={{ color: '#C414C60', fontFamily: 'Nunito-Regular', fontSize: 15 }}>Nothing sended</Text>
            </View>
          </TouchableOpacity>

        </SafeAreaView>

      </ImageBackground>
    </View>
  )
}
