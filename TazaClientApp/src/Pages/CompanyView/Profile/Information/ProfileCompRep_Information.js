import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { styles } from '../../../../styles/Styles'
import { useNavigation } from '@react-navigation/native'
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../../../Storage/TokenStorage';
import { removeRole } from '../../../../Storage/RoleStorage'
import Repetear from '../../../../MobX/ProfileMobxRener'
import { instance } from '../../../../Api/ApiManager';
import { observer } from 'mobx-react-lite';
import { getLanguage, storeLanguage } from '../../../../Storage/LanguageStorage';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import '../../../../Translations/i18n'


export const ProfileCompRep_Information = observer(() => {
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const removeRefreshFromStorage = async () => { const item = await removeRefreshToken() };
  const removeAccessFromStorage = async () => { const item = await removeAccessToken() };
  const removeRoleFromtorage = async () => { const item = await removeRole() };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const [data, setData] = useState('');

  useEffect(() => {
    readItemFromStorage()
    readLanguage()
    changeLanguage()
    instance.get('/private/companies/user', config).then((res) => {
      setData(res.data)
      console.log(res.data)
    }).catch(err => console.log(err))

  }, [token, Repetear.bool])

  const navigation = useNavigation()

  //language
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState();

  const [language, setStorageLanguage] = useState();
  const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };

  // useEffect(() => {
  //   readLanguage()
  //   console.log(language)
  //   changeLanguage(language)
  // }, [language])

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

  const LogOut = () => {
    removeRefreshFromStorage()
    removeAccessFromStorage()
    removeRoleFromtorage()
    navigation.navigate("Welcome")
  }


  return (
    <View>
      <View style={styles.profile_info}>
        <Image source={require('../../../../Assets/images/ic/icon-park-outline_city.png')} style={{ marginHorizontal: 30 }} />
        <Text style={sStyle.secondary_second}>Astana</Text>
      </View>

      <View style={styles.profile_info}>
        <Image source={require('../../../../Assets/images/ic/ic_address.png')} style={{ marginHorizontal: 30 }} />
        <Text style={sStyle.secondary_second}>{data.address}</Text>
      </View>

      <View style={styles.profile_info}>
        <Image source={require('../../../../Assets/images/ic/ic_phone.png')} style={{ marginHorizontal: 30 }} />
        <Text style={sStyle.secondary_second}>{data.phoneNumber}</Text>
      </View>

      <View style={styles.profile_info}>
        <Image source={require('../../../../Assets/images/ic/ic_mail.png')} style={{ marginHorizontal: 30 }} />
        <Text style={sStyle.secondary_second}>{data.email}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.company_contsct_btn} onPress={() => navigation.navigate('ProfileCompRep_EditInformation')}>
          <Text style={sStyle.secondary_button}>{t('Edit Profile')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.company_contsct_btn} onPress={toggleModal}>
          <Text style={sStyle.secondary_button}>{t('Change language')}</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity style={styles.company_contsct_btn_secondary} onPress={LogOut}>
          <Text style={sStyle.secondary_button}>{t('Log Out')}</Text>
        </TouchableOpacity>
      <View>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                <Image source={require('../../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
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
    </View>
  )
})

const sStyle = StyleSheet.create({

  primary: {
    alignItems: 'center',
    top: '45%',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'Lobster-Regular',
    fontSize: 25
  },
  secondary: {
    top: '15%',
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15
  },
  secondary_second: {
    color: '#404C60',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    position: 'absolute',
    left: '30%',
    fontWeight: '900',
    letterSpacing: 0.1
  },
  secondary_button: {
    color: '#D9D9D9',
    fontFamily: 'Nunito-Black',
    fontSize: 15,
  },

});