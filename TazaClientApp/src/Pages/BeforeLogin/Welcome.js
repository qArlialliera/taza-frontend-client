import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { styles } from '../../styles/Styles';
// import { sStyle } from '../styles/sStyle';


export const Welcome = ({ navigation }) => {
    const loadScene = () => { navigation.navigate('Welcome2') }
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