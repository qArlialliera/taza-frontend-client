import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../../../../styles/Styles'
import { useNavigation } from '@react-navigation/native'
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../../../Storage/TokenStorage';
import {removeRole} from '../../../../Storage/RoleStorage'
import Repetear from '../../../../MobX/ProfileMobxRener'
import { instance } from '../../../../Api/ApiManager';
import { observer } from 'mobx-react-lite';

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

    instance.get('/private/companies/user', config).then((res)=>{
      setData(res.data)
      console.log(res.data)
    }).catch(err=>console.log(err))

  }, [token, Repetear.bool])
  
  const navigation = useNavigation()

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
        <TouchableOpacity style={styles.company_contsct_btn} onPress={()=>navigation.navigate('ProfileCompRep_EditInformation')}>
          <Text style={sStyle.secondary_button}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.company_contsct_btn_secondary} onPress={LogOut}>
          <Text style={sStyle.secondary_button}>Log Out</Text>
        </TouchableOpacity>
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