import React, { useState, useEffect } from 'react'
import { View, ScrollView, ImageBackground, Text, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native'
import { styles } from '../../../styles/Styles'
import { instance } from '../../../Api/ApiManager';
import { getAccessToken } from '../../../Storage/TokenStorage';
import Modal from "react-native-modal";
import Repetear from '../../../MobX/ProfileMobxRener'


export const CreateCompany = ({ navigation }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalErrorVisible, setModalErrorVisible] = useState(false);


    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }


    const [isKeyboardOpen, setKeyboardVisible] = useState(false);
    useEffect(() => {
        readItemFromStorage()
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [token]);

    const createCompany = () => {
        const company = { name, email, phoneNumber, address }
        instance.post('/private/companies/add', company, config).then((res) => {
            setModalVisible(true)
            Repetear.trigger();
        }).catch(err => {
            setModalErrorVisible(true)
            console.log(err)
        })
    }

    const returnToProfile = () =>{
        setModalVisible(false)
        navigation.navigate("BottomBarCompany")
    }


    const WrapperComponent = () => {
        return (
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={returnToProfile}>
                            <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Company Created!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={returnToProfile}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }

    const WrapperComponentError = () => {
        return (
            <View>
                <Modal isVisible={isModalErrorVisible}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => setModalErrorVisible(false)} >
                            <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Ooops, something went wrong!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={() => setModalErrorVisible(false)} >
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imagehome}>
                <View style={styles.container3}>
                    <Text style={sStyle.primary}>Creating company</Text>
                    <TextInput style={styles.input} value={name} placeholder={"Company Name"} onChangeText={(text) => setName(text)} />
                    <TextInput style={styles.input} value={email} placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.input} value={address} placeholder={"Company address"} onChangeText={(text) => setAddress(text)} />
                    <TextInput style={styles.input} value={phoneNumber} placeholder={"Phone Number"} onChangeText={(text) => setPhoneNumber(text)} />
                </View>
                {/* 
                <View style={styles.containerButtonNext}>
                    <TouchableOpacity style={styles.roundButton2} onPress={createCompany}>
                        <Image source={require('../../../Assets/images/ic/ic_arrow.png')}></Image>
                    </TouchableOpacity>
                </View> */}

                {
                    !isKeyboardOpen ?
                        <View style={styles.containerButtonNext}>
                            <TouchableOpacity style={styles.roundButton2} onPress={createCompany}>
                                <Image source={require('../../../Assets/images/ic/ic_arrow.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        :
                        <View></View>
                }


                <WrapperComponent />
                <WrapperComponentError />
            </ImageBackground>
        </View>
    )
}

const sStyle = StyleSheet.create({

    primary: {
        marginBottom: 20,
        color: '#EFD3D7',
        fontFamily: 'Lobster-Regular',
        fontSize: 35,
        alignSelf: 'center'
    },
    secondary: {
        top: '15%',
        color: '#EFD3D7',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 30
    },
    pink_button_text: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#414C60',
    },
});