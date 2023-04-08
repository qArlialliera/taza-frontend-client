import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from '../../styles/Styles'
import { instance } from "../../Api/ApiManager";
import { getRefreshToken, storeAccessToken, storeRefreshToken } from "../../Storage/TokenStorage";

export const UserLogin = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const loadSceneBack = () => { navigation.navigate('Welcome2') }

    const findUser = (e) => {
        e.preventDefault();
        const user = { username, password };
        console.info(user)
        instance.post('public/auth/login', user)
            .then(function (response) {
                console.log(response.data)
                if (response.data.roles[0].authority == 'ROLE_USER') {
                    storeRefreshToken(response.data.refreshToken)
                    storeAccessToken(response.data.accessToken)
                    console.log(response.data)
                    navigation.navigate("BottomBar")
                }
                else alert('You are not a user')

            })
            .catch(function (error) {
                alert('Wrong username or password')
                console.log(error);
            });


    }


    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../Assets/images/registration.png')} style={styles.image}>
                <View style={styles.container3}>
                    <Text style={{ marginBottom: 20, color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 35 }}>Login</Text>
                    <TextInput style={styles.input} value={username} placeholder={"Username"} onChangeText={(text) => setUsername(text)} />
                    <TextInput style={styles.input} value={password} placeholder={"Password"} secureTextEntry onChangeText={(text) => setPassword(text)} />

                </View>

                <View style={styles.containerButtonNext}>
                    <TouchableOpacity style={styles.roundButton2} onPress={(text) => findUser(text)}>
                        <Image source={require('../../Assets/images/ic/ic_arrow.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButtonBack}>
                    <TouchableOpacity style={styles.roundButton2} onPress={loadSceneBack}>
                        <Image source={require('../../Assets/images/ic/ic_arrow_back.png')}></Image>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        </View>
    );
}