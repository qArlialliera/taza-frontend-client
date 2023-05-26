import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../../styles/Styles';
import { instance } from "../../../Api/ApiManagerPublic";
import { getAccessToken, getRefreshToken } from '../../../Storage/TokenStorage';
import Repetear from '../../../MobX/ProfileMobxRener'
import ImagePicker from 'react-native-image-crop-picker';
import { t } from 'i18next';
import instanceToken from '../../../Api/ApiManager';


export const EditProfile = ({ navigation }) => {
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };

    const [username, setUsername] = useState("");
    const [fullName, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const myImage = new FormData();

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
        },
    }
    const config2 = { headers: { 'Authorization': 'Bearer ' + token } }

    useEffect(() => {
        readItemFromStorage();
        instanceToken.get('/user/user-details', config2)
            .then(function (response) {
                console.log(response.data.id)
                setUsername(response.data.username)
                setFullname(response.data.fullName)
                setAddress(response.data.address)
                setEmail(response.data.email)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [token]);
    const imagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            savePhoto(image)
        });

    }
    const savePhoto = (image) => {
        myImage.append('file', {
            uri: Platform.OS === "android" ? image.path : image.path.replace("file://", ""),
            name: `image${response.data.username}.jpg`,
            type: image.mime
        })
        instance.post('/file/save', myImage, config).then((response) => {
            uploadPhoto(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const uploadPhoto = (photoUuid) => {

        fetch(`http://192.168.31.151:8080/private/user/photo/upload/${photoUuid}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then((response) => {
                console.log('successfully added!', response);
            })
            .catch((error) => {
                console.log('err --', error);
            });

        Repetear.trigger();
    }
    const saveProfile = (e) => {
        e.preventDefault();
        const data = { username, fullName, email, address };
        console.log(data)
        instanceToken.put('/user/edit/profile', data, config2)
            .then(function (response) {
                alert('Updated successfully!')
                console.log(response.data);
                Repetear.trigger();

            })
            .catch(function (error) {
                alert('err')
                console.log(error);
            });

    }
    const backNav = () => {
        navigation.navigate("BottomBar")
    }

    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/registration.png')} style={styles.back}>
                <TouchableOpacity onPress={backNav} style={{ marginTop: 20, alignItems: 'flex-start' }}>
                    <Image source={require('../../../Assets/images/ic/ri_menu-4-fill.png')} />
                </TouchableOpacity>
                <View style={styles.container2}>
                    <Text style={sStyle.primary}>{t('Edit Profile Page')}</Text>
                    <TextInput style={styles.input} value={fullName} placeholder={"Full Name"} onChangeText={(text) => setFullname(text)} />
                    <TextInput style={styles.input} value={username} placeholder={"Username"} onChangeText={(text) => setUsername(text)} />
                    <TextInput style={styles.input} value={email} placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.input} value={address} placeholder={"Address"} onChangeText={(text) => setAddress(text)} />
                    <TouchableOpacity onPress={() => imagePicker()} style={styles.profile_info_button_secondary}>
                        <Image source={require('../../../Assets/images/upload_photo.png')} style={{ width: 40, height: 40 }} />
                        <Text style={sStyle.secondary_button}>{t('Add Profile Photo')}</Text>
                    </TouchableOpacity>
                </View>



                <TouchableOpacity onPress={(text) => saveProfile(text)} style={styles.profile_info_button}>
                    <Text style={sStyle.secondary_button}>{t('Edit Profile Page')}</Text>
                </TouchableOpacity>

            </ImageBackground>

        </View>
    );
}

const sStyle = StyleSheet.create({

    primary: {
        // top: '45%',
        marginBottom: 20,
        color: '#fff',
        fontFamily: 'Lobster-Regular',
        fontSize: 35
    },
    secondary: {
        top: '15%',
        color: '#fff',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 30
    },
    secondary_button: {
        color: '#D9D9D9',
        fontFamily: 'Nunito-Black',
        fontSize: 15,
    },
});