import React, { useState, useEffect } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import { styles } from '../../../styles/Styles'
import { messagestyle } from '../../../styles/MessagesStyle'
import { useNavigation } from '@react-navigation/native';
import Stomp from 'stompjs'
import SockJS from 'sockjs-client';
import { instance } from '../../../Api/ApiManager';
import { getAccessToken } from '../../../Storage/TokenStorage';



// var stompClient = null
export const MessagesChat = (props) => {
    const pp = JSON.parse(JSON.stringify(props)).route.params
    const navigation = useNavigation();
    const [data, setData] = useState("");

    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }
    // const url = 'http://localhost:8080/ws';

    const [socket, setSocket] = useState(null);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const [userData, setUserData] = useState({
        senderId: data.id,
        recipientId: pp.id,
        senderName: data.name,
        recipientName: pp.name,
    })

    useEffect(() => {
        readItemFromStorage()
        instance.get('private/user/user-details', config).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.log(error);
        });
        connect()
    }, []);

    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        // const socket = new SockJS('http://192.168.31.156:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, console.error('error'));
    };
    const onConnected = () => {
        console.log("connected");

        // stompClient.subscribe(
        //     "/user/" + 5 + "/queue/messages",
        //     onMessageReceived
        // );
    };


    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                senderId: data.id,
                recipientId: pp.id,
                senderName: data.name,
                recipientName: pp.name,
                content: msg,
                timestamp: new Date(),
            };

            stompClient.send("/app/chat", {}, JSON.stringify(message));
        }
    };

    const handleSend = () => {
        if (socket && inputText.trim() !== '') {
            socket.send(inputText);
            setInputText('');
        }
    };




    return (
        <View style={messagestyle.container}>
            <View style={messagestyle.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomBar')} style={{}}>
                    <Image source={require('../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                </TouchableOpacity>
                <View style={messagestyle.row}>
                    <Text style={messagestyle.headerTitle}>{pp.name}</Text>
                    <Image style={styles.msg_img} source={require('../../../Assets/images/profile_ava.png')} />
                </View>
            </View>
            <View style={messagestyle.chatContainer}>
                {/* <View style={messagestyle.chatBubble}>
                    <Text style={messagestyle.chatText}>Hi! How are you?</Text>
                </View> */}
                {/* <View style={[messagestyle.chatBubble, messagestyle.chatBubbleMine]}>
                    <Text style={[messagestyle.chatText, messagestyle.chatTextMine]}>I'm doing great!</Text>
                </View> */}

                {messages.map((message, index) => (
                    <Text key={index}>{message}</Text>
                ))}
            </View>
            <View style={messagestyle.inputContainer}>
                <TextInput style={messagestyle.input} placeholder="Type a message" value={inputText} onChangeText={setInputText} />
                <TouchableOpacity style={messagestyle.sendButton} onPress={handleSend} >
                    {/* <Text style={styles.sendButtonText}>Send</Text> */}
                    <Image source={require('../../../Assets/images/ic/ic_round-send.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

