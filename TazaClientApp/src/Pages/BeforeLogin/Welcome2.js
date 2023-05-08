import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../styles/Styles'

import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import '../../Translations/i18n'
import { getLanguage, storeLanguage } from '../../Storage/LanguageStorage';




export const Welcome2 = ({ navigation }) => {
    const loadSceneRegistration = () => { navigation.navigate('WelcomeChooseRole') }
    const loadSceneLogin = () => { navigation.navigate('UserLogin') }

    //language
    const { t, i18n } = useTranslation();
    const [currentLanguage, setLanguage] = useState();

    const [language, setStorageLanguage] = useState();
    const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };

    useEffect(() => {
        readLanguage()
        console.log(language)
        changeLanguage(language)
    }, [language])
    
    const selectLan = (value) => {
        toggleModal()
        storeLanguage(value)
        changeLanguage(value)
    }

    const changeLanguage = (value) => {
        // 
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    //modal
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../Assets/images/welcome2.png')} style={styles.image}>
                <Text style={{ top: '45%', color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 35 }}>{t('Join_to_us')}</Text>
                <Pressable style={styles.pink_button} onPress={loadSceneRegistration}>
                    <Text style={{ fontFamily: 'mt-secondary', fontSize: 16, lineHeight: 21, letterSpacing: 0.25, color: '#414C60' }}>{t('Registration')}</Text>
                </Pressable>
                <Pressable style={styles.pink_button} onPress={loadSceneLogin}>
                    <Text style={{ fontFamily: 'mt-secondary', fontSize: 16, lineHeight: 21, letterSpacing: 0.25, color: '#414C60' }}>{t('Login')}</Text>
                </Pressable>
                <Pressable style={styles.pink_button} onPress={toggleModal}>
                    <Text style={{ fontFamily: 'mt-secondary', fontSize: 16, lineHeight: 21, letterSpacing: 0.25, color: '#414C60' }}>{t('Select_Language')}</Text>
                </Pressable>
                <View>
                    <Modal isVisible={isModalVisible}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                                <Image source={require('../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                            </TouchableOpacity>
                            <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                                <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 25, color: 'black', alignSelf: 'center', top: '-20%' }}>{t('Select_Language')}</Text>
                                    <Pressable style={styles.profile_info_button} onPress={() => selectLan('ru')}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Русский</Text>
                                    </Pressable>

                                    <Pressable style={styles.profile_info_button} onPress={() => selectLan('kz')}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Қазақша</Text>
                                    </Pressable>

                                    <Pressable style={styles.profile_info_button} onPress={() => selectLan('en')}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>English</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                    </Modal>
                </View>
            </ImageBackground>
        </View>
    );
};