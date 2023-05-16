import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, Image } from 'react-native'
import { styles } from '../../../styles/Styles'
import { t } from 'i18next';
import { getAccessToken } from '../../../Storage/TokenStorage';
import { instance } from '../../../Api/ApiManager';
import { AvatarImage } from '../../AfterLogin/CompanyList/CompanyDetails/AvatarImage';
import { messagestyle } from '../../../styles/MessagesStyle'
import { observer } from 'mobx-react-lite';
import Repeater from '../../../MobX/ProfileMobxRener'
import Stomp from 'stompjs'


var stompClient = null;
var SockJS = require('sockjs-client/dist/sockjs.js');

export const MessagesCompRep = observer(({ navigation }) => {

  const [chatList, setChatList] = useState('')

  const getChatList = () => {
    instance.get('private/messages/chat-rooms', config).then(res => {
      setChatList(res.data)
    }).catch(err => console.log(err))
  }


  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const [userData, setUserData] = useState('');

  useEffect(() => {
    readItemFromStorage()
    getChatList()
    instance.get('private/user/user-details', config).then(function (response) {
      setUserData(response.data)
    }).catch(function (error) {
      console.log(error);
    });
    connect()
  }, [token, Repeater.bool])

  const connect = () => {
    var socket = new SockJS("http://192.168.31.156:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, console.log("err"));
  }

  const onConnected = () => {
    console.log("connected");
    stompClient.subscribe('/chatroom/private', onMessageReceived);
  };


  const onMessageReceived = (payload) => {
    Repeater.trigger()
  }

  const adminItem = {
    id: 1,
    name: "admin",
    password: "$2a$10$9XSGvzkg87mvrOhanNH9V.YmOi3i4Khjs98pczfUiwUgUSsyF4ZcO",
    fullName: "Admin",
    email: "admin@mail.ru",
    city: "Astana",
    address: "Mangilik",
    phoneNumber: "87777777777",
    photo: null
  }

  return (
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.back}>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 30 }}>{t('Messages')}</Text>
        </View>
        <SafeAreaView style={styles.container_messages}>


          {/* <FlatList
            data={chatList}
            renderItem={
              ({ item }) => {
                const date = new Date(item.timestamp);
                const time = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
                return (
                  <View key={item.id} >
                    <TouchableOpacity style={{ width: '100%', flexDirection: 'row', height: 90, alignItems: 'center', }}
                      onPress={() => navigation.navigate("Massages_Chat", { item, userData, token })}>

                      <AvatarImage  props={item.photo} />
                      <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 20, width: '70%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ color: 'white', fontFamily: 'Nunito-Black', fontSize: 20 }}>{item.username}</Text>
                          <Text style={{ color: '#A8A8A8', fontFamily: 'Nunito-Regular', fontSize: 15 }}>{time}</Text>
                        </View>
                        <Text style={{ color: '#A8A8A8', fontFamily: 'Nunito-Regular', fontSize: 15 }}>{item.message}</Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                )
              }

            }
          /> */}

          <FlatList
            data={chatList}
            renderItem={
              ({ item }) => {
                const date = new Date(item.timestamp);
                const time = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
                return (
                  <View key={item.id} >
                    {

                      <TouchableOpacity
                        style={
                          item.status === 'DELIVERED' && item.senderId !== userData.id
                            ? { ...messagestyle.chatListItemActive }
                            : { ...messagestyle.chatListItem }
                        }

                        onPress={() => navigation.navigate("Massages_Chat", { item, userData, token })}>
                        <AvatarImage props={item.photo} />
                        <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 20, width: '70%' }}>
                          <View style={messagestyle.alltext}>
                            <View style={messagestyle.text}>
                              <Text style={
                                item.status === 'DELIVERED' && item.senderId !== userData.id
                                  ? { ...messagestyle.textNameActive }
                                  : { ...messagestyle.textName }
                              }>{item.username}</Text>
                              <Text
                                style={
                                  item.status === 'DELIVERED' && item.senderId !== userData.id
                                    ? { ...messagestyle.bodyNameActive }
                                    : { ...messagestyle.bodyName }
                                }
                              >{item.message}</Text>

                            </View>

                            <View style={messagestyle.textReverse}>
                              <Text style={messagestyle.timeText}>{time}</Text>
                              {item.status === 'DELIVERED' && item.senderId !== userData.id ? (
                                <Text style={messagestyle.circle}>{item.newMessagesCount}</Text>
                              ) : null}
                            </View>
                          </View>

                        </View>
                      </TouchableOpacity>
                    }

                  </View>
                )
              }

            }
          />


          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', height: 90, alignItems: 'center', borderColor: '#C414C60', borderWidth: 1, borderRadius: 10, backgroundColor: '#8E9AAF' }}
            onPress={() => navigation.navigate("Massages_Chat", { item: adminItem, userData, token })}>
            <Image source={require('../../../Assets/images/newimg.png')} style={styles.image_card_m} resizeMode="cover" />
            <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 20, width: '70%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white', fontFamily: 'Nunito-Black', fontSize: 20 }}>{t('Write to admins')}</Text>
              </View>
              {/* <Text style={{ color: '#C414C60', fontFamily: 'Nunito-Regular', fontSize: 15 }}>Nothing sended</Text> */}
            </View>
          </TouchableOpacity>
        </SafeAreaView>

      </ImageBackground>
    </View>
  )
}
)