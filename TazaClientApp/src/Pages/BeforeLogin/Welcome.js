import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { styles } from '../../styles/Styles';
import { getRefreshToken } from "../../Storage/TokenStorage";
// import { sStyle } from '../styles/sStyle';


export const Welcome = ({ navigation }) => {
    const loadScene = () => { navigation.navigate('Welcome2') }
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getRefreshToken(); setToken(item) };
    useEffect(() => { 
        readItemFromStorage() 
        if(token) navigation.navigate('BottomBar')
        console.log('token - ', token)
    }, [token])


    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../Assets/images/welcome.png')} style={styles.image}>
                <Text style={{ top: '15%', color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 35 }}>Welcome to</Text>
                <Text style={{ top: '15%', color: '#fff', fontFamily: 'Nunito-SemiBold', fontSize: 30 }}>TazaApp</Text>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.roundButton1} onPress={loadScene}>
                        <Image source={require('../../Assets/images/ic/ic_arrow.png')}></Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}