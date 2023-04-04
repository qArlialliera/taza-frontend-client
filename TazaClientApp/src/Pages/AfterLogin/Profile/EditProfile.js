import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../../styles/Styles';
import { instance } from "../../../Api/ApiManager";
import { getAccessToken } from '../../../Storage/TokenStorage';



export const EditProfile = ({ navigation }) => {
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };

    const [username, setUsername] = useState("");
    const [fullName, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    const [myfile, setFile] = useState('');
    const image = new FormData();

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }
    useEffect(() => {
        readItemFromStorage();
        console.log(token)
    }, []);
    const uploadPhoto = (e) => {

    }

    const saveProfile = (e) => {
        e.preventDefault();
        const data = { username:username, fullName:fullName, email:email, address:address };
        instance.post('private/user/edit/profile', config, data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                alert('err')
                console.log(error);
            });

    }
    const backNav = () => {
        navigation.replace("BottomBar")
    }

    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/registration.png')} style={styles.back}>
                <TouchableOpacity onPress={backNav} style={{ marginTop: 20, alignItems: 'flex-start' }}>
                    <Image source={require('../../../Assets/images/ic/ri_menu-4-fill.png')} />
                </TouchableOpacity>
                <View style={styles.container2}>
                    <Text style={sStyle.primary}>Edit Profile</Text>
                    <TextInput style={styles.input} value={fullName} placeholder={"Full Name"} onChangeText={(text) => setFullname(text)} />
                    <TextInput style={styles.input} value={username} placeholder={"Username"} onChangeText={(text) => setUsername(text)} />
                    <TextInput style={styles.input} value={email} placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.input} value={address} placeholder={"Address"} onChangeText={(text) => setAddress(text)} />
                    <TouchableOpacity onPress={(e) => uploadPhoto(e)} style={styles.profile_info_button_secondary}>
                        <Image source={require('../../../Assets/images/upload_photo.png')} style={{ width: 40, height: 40 }} />
                        <Text style={sStyle.secondary_button}>Add Profile Photo</Text>
                    </TouchableOpacity>
                </View>



                <TouchableOpacity onPress={(text) => saveProfile(text)} style={styles.profile_info_button}>
                    <Text style={sStyle.secondary_button}>Edit Profile</Text>
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