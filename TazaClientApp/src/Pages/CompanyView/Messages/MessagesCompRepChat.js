import React, { useState, useEffect } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { styles } from '../../../styles/Styles'
import { getAccessToken } from '../../../Storage/TokenStorage';
import { useNavigation } from '@react-navigation/native';
import { messagestyle } from '../../../styles/MessagesStyle'

export const MessagesCompRepChat = (props) => {

    const pp = JSON.parse(JSON.stringify(props)).route.params
    const navigation = useNavigation();
    const [data, setData] = useState("");

    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    const [inputText, setInputText] = useState('');




    return (
        <View style={messagestyle.container}>
            <View style={messagestyle.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomBarCompany')} style={{}}>
                    <Image source={require('../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                </TouchableOpacity>
                <View style={messagestyle.row}>
                    <Text style={messagestyle.headerTitle}>{pp.name}</Text>
                    <Image style={styles.msg_img} source={require('../../../Assets/images/profile_ava.png')} />
                </View>
            </View>
            <View style={messagestyle.chatContainer}>
                <View style={messagestyle.chatBubble}>
            <Text style={messagestyle.chatText}>Hi! How are you?</Text>
        </View>
                <View style={[messagestyle.chatBubble, messagestyle.chatBubbleMine]}>
            <Text style={[messagestyle.chatText, messagestyle.chatTextMine]}>I'm doing great!</Text>
        </View>
            </View>
            <View style={messagestyle.inputContainer}>
                <TextInput style={messagestyle.input} placeholder="Type a message" value={inputText} onChangeText={setInputText} />
                <TouchableOpacity style={messagestyle.sendButton} >
                    <Image source={require('../../../Assets/images/ic/ic_round-send.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
