import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from '../../styles/Styles'
import { instance } from "../../Api/ApiManager";
import { getRefreshToken, storeAccessToken, storeRefreshToken } from "../../Storage/TokenStorage";
import { getRole, storeRole } from "../../Storage/RoleStorage";

import '../../Translations/i18n'
import { useTranslation } from 'react-i18next';


export const UserLogin = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const loadSceneBack = () => { navigation.navigate('Welcome2') }

    //Languages
    const { t } = useTranslation();

    const findUser = (e) => {
        e.preventDefault();
        const loguser = {
            username: username,
            password: password
        }
        instance.post('public/auth/login', loguser)
            .then(function (response) {
                storeRole(response.data.roles[0].authority)
                storeRefreshToken(response.data.refreshToken)
                storeAccessToken(response.data.accessToken)
                if (response.data.roles[0].authority === 'ROLE_COMPANY') navigation.navigate('BottomBarCompany')
                else navigation.navigate('BottomBar')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../Assets/images/registration.png')} style={styles.image}>
                <View style={styles.container3}>
                    <Text style={{ marginBottom: 20, color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 35 }}>{t('Login')}</Text>
                    <TextInput style={styles.input} value={username} placeholder={t("Username")} onChangeText={(text) => setUsername(text)} />
                    <TextInput style={styles.input} value={password} placeholder={t("Password")} secureTextEntry onChangeText={(text) => setPassword(text)} />

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