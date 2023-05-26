import React, { useState, useEffect } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import { styles } from '../../../styles/Styles'
import { getAccessToken } from '../../../Storage/TokenStorage';
import { useNavigation } from '@react-navigation/native';
import { messagestyle } from '../../../styles/MessagesStyle'
import instanceToken from '../../../Api/ApiManager';


var stompClient = null;
var SockJS = require('sockjs-client/dist/sockjs.js');
export const MessagesCompRepChat = (props) => {

    const pp = JSON.parse(JSON.stringify(props)).route.params


    // console.log(pp)


    const [messagesArray, setMessagesArray] = useState([]);
    const currentTimestamp = moment().format('yyyy-MM-DD[T]HH:mm:ss.SSS');

    const [userrData, setUserrData] = useState({
        username: '',
        receivername: '',
        message: ''
    });



    const navigation = useNavigation();


    useEffect(() => {
        connect()

    }, []);

    const connect = () => {
        var socket = new SockJS("http://192.168.31.151:8080/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {

        console.log("connected");
        getMessages()
        changeStatus(pp.item.id)
        stompClient.subscribe('/chatroom/private', onMessageReceived);
        stompClient.subscribe('/user/' + pp.userData.username + '/private', onPrivateMessage);
    };
    const onError = (err) => {
        console.log("err", err);
    };
    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        setMessagesArray(messagesArray => [...messagesArray, payloadData]);
        console.log(messagesArray)
    }
    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        console.log('private ', payloadData)
    }
    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderId: pp.userData.id,
                senderName: pp.userData.username,
                recipientId: pp.item.id,
                recipientName: pp.item.name,
                content: userrData.message,
                timestamp: currentTimestamp,
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserrData({ ...userrData, "message": "" });
            console.log(messagesArray)
        }
    }



    const handleMessage = (value) => {
        setUserrData({ ...userrData, message: value });
    }


    const getMessages = () => {
        instanceToken.get(`/messages/${pp.item.id}`).then(res => {
            console.log('getMessages -', res.data)
            setMessagesArray(res.data)
        }).catch(err => console.log(err))
    }

    const renderItem = ({ item }) => {
        const date = new Date(item.timestamp);
        const time = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
        return (
            item.senderId === pp.userData.id ?
                <View style={[messagestyle.chatBubble, messagestyle.chatBubbleMine]}>
                    <Text style={[messagestyle.chatText, messagestyle.chatTextMine]}>{item.content}</Text>
                    <Text style={[messagestyle.timestamp, messagestyle.timestampMine]}>{time}</Text>
                </View>
                :
                <View style={messagestyle.chatBubble}>
                    <Text style={messagestyle.chatText}>{item.content}</Text>
                    <Text style={messagestyle.timestamp}>{time}</Text>
                </View>
        );
    };

    const sortedData = messagesArray.slice().sort((a, b) => a.id - b.id);

    
    const changeStatus = (senderId) => {
        instanceToken.put(`/messages/change-status/${senderId}`, null).then(res=>{
          console.log('CHANGED! - ', res.data )
        }).catch(err=>console.log(err))
      }

    return (
        <View style={messagestyle.container}>
            <View style={messagestyle.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomBarCompany')} style={{}}>
                    <Image source={require('../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                </TouchableOpacity>
                <View style={messagestyle.row}>
                    <Text style={messagestyle.headerTitle}>{pp.item.name}</Text>
                    <Image style={styles.msg_img} source={require('../../../Assets/images/profile_ava.png')} />
                </View>
            </View>
            <View style={messagestyle.chatContainer}>

                <FlatList
                    data={sortedData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />


            </View>
            <View style={messagestyle.inputContainer}>
                <TextInput style={messagestyle.input} placeholder="Type a message" value={userrData.message} onChangeText={handleMessage} />
                <TouchableOpacity style={messagestyle.sendButton} onPress={sendPrivateValue}>
                    <Image source={require('../../../Assets/images/ic/ic_round-send.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
