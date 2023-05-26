import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styles } from '../../../styles/Styles'
import { instance } from "../../../Api/ApiManagerPublic";
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../../Storage/TokenStorage';
import { removeRole } from '../../../Storage/RoleStorage'
import { observer } from 'mobx-react-lite'
import Repetear from '../../../MobX/ProfileMobxRener'
// import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import '../../../Translations/i18n'
import { getLanguage, storeLanguage } from '../../../Storage/LanguageStorage'
import instanceToken from '../../../Api/ApiManager';


export const Profile = observer(({ navigation }) => {

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


  const [data, setData] = useState("");
  const [orderCount, setOrderCount] = useState('');
  const [commentCount, setCommentCount] = useState('');
  const removeRefreshFromStorage = async () => { const item = await removeRefreshToken() };
  const removeAccessFromStorage = async () => { const item = await removeAccessToken() };
  const removeRoleFromtorage = async () => { const item = await removeRole() };

  const [imageData, setImageData] = useState(null);


  useEffect(() => {
    instanceToken.get('/user/user-details').then(function (response) {
      setData(response.data)
      getImage(response.data.photo)

      instanceToken.get(`/user/orders/count/${response.data.id}`).then(res => {setOrderCount(res.data)}).catch(err => console.error(err))
      instanceToken.get(`/user/reviews/count/${response.data.id}`).then(res => setCommentCount(res.data)).catch(err => console.error(err))
    }).catch(function (error) {
      console.log(error);
    });


  }, [Repetear.bool])

  const Bdutton = () => {
    navigation.navigate("edit_profile")
  }
  const getImage = (uuid) => {
    console.log(uuid)
    instance.get(`/file/photo/get/${uuid}`, { responseType: 'blob' }).then((response) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(response.data);

    }).catch(err => console.error(err))
  }
  const LogOut = () => {
    removeRefreshFromStorage()
    removeAccessFromStorage()
    removeRoleFromtorage()
    navigation.navigate("Welcome")
  }
  return (
    <ScrollView style={styles.containerwellcome}>
      <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
        <View style={styles.containerhead}>
          <View>
            <View><Text style={sStyle.primary}>{data.fullName}</Text></View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={styles.icons}>
                <Image source={require('../../../Assets/images/profile_order.png')} style={{ borderColor: '#8E9AAF', borderWidth: 2, borderRadius: 100 }}></Image>
                <Text style={sStyle.secondary}>{orderCount} {t('Order')}</Text>
              </View>
              <View style={styles.icons}>
                <Image source={require('../../../Assets/images/profile_comment.png')} style={{ borderColor: '#8E9AAF', borderWidth: 2, borderRadius: 100 }}></Image>
                <Text style={sStyle.secondary}>{commentCount} {t('Comments')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.alignright}>

            {
              imageData
                ? <Image source={{ uri: imageData }} style={styles.image_avater} />
                : <Image source={require('../../../Assets/images/profile_ava.png')} />
            }
            {/* {console.log('imageData', imageData)} */}
          </View>
        </View>
        <View style={{ marginHorizontal: 50 }}>
          <View style={styles.profile_info}>
            <Image source={require('../../../Assets/images/ic/icon-park-outline_city.png')} style={{ marginHorizontal: 30 }} />
            <Text style={sStyle.secondary_second}>{data.city}</Text>
          </View>

          <View style={styles.profile_info}>
            <Image source={require('../../../Assets/images/ic/ic_address.png')} style={{ marginHorizontal: 30 }} />
            <Text style={sStyle.secondary_second}>{data.address}</Text>
          </View>

          <View style={styles.profile_info}>
            <Image source={require('../../../Assets/images/ic/ic_phone.png')} style={{ marginHorizontal: 30 }} />
            <Text style={sStyle.secondary_second}>87078539119</Text>
          </View>

          <View style={styles.profile_info}>
            <Image source={require('../../../Assets/images/ic/ic_mail.png')} style={{ marginHorizontal: 30 }} />
            <Text style={sStyle.secondary_second}>{data.email}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.company_contsct_btn} onPress={Bdutton} >
              <Text style={sStyle.secondary_button}>{t('Edit Profile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.company_contsct_btn} onPress={toggleModal}>
              <Text style={sStyle.secondary_button}>{t('Change language')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.company_contsct_btn_secondary} onPress={LogOut}>
              <Text style={sStyle.secondary_button}>{t('Log Out')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
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

    </ScrollView>
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