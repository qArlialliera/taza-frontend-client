import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/Styles'
import { instance } from "../../../Api/ApiManager";
import FastImage from 'react-native-fast-image'
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../../Storage/TokenStorage';
import { observer } from 'mobx-react-lite'
import Repetear from '../../../MobX/ProfileMobxRener'
import {Buffer} from 'buffer';
import base64 from 'react-native-base64'


export const Profile = observer(({ navigation }) => {
  const [data, setData] = useState("");
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const removeRefreshFromStorage = async () => { const item = await removeRefreshToken() };
  const removeAccessFromStorage = async () => { const item = await removeAccessToken() };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const [imageData, setImageData] = useState(null);


  useEffect(() => {
    readItemFromStorage()
    // console.log('e == ', token)
    instance.get('private/user/user-details', config)
      .then(function (response) {
        setData(response.data)
        // const imgdata = Buffer.from(response.data.photo, 'binary').toString('base64');
        // setImageData(imgdata)
        const imgdata = base64.encode(response.data.photo);
        setImageData(imgdata)
        console.log(imgdata)
      })
      .catch(function (error) {
        console.log(error);
      });

      // console.log('imageData', imageData)
  }, [token, Repetear.bool])

  const Bdutton = () => {
    navigation.navigate("edit_profile")
  }

  const LogOut = () => {
    removeRefreshFromStorage()
    removeAccessFromStorage()
    navigation.navigate("Welcome")
  }
  return (
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
        <View style={styles.containerhead}>
          <View>
            <View><Text style={sStyle.primary}>{data.fullName}</Text></View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={styles.icons}>
                <Image source={require('../../../Assets/images/profile_order.png')} style={{ borderColor: '#8E9AAF', borderWidth: 2, borderRadius: 100 }}></Image>
                <Text style={sStyle.secondary}>5 Order</Text>
              </View>
              <View style={styles.icons}>
                <Image source={require('../../../Assets/images/profile_comment.png')} style={{ borderColor: '#8E9AAF', borderWidth: 2, borderRadius: 100 }}></Image>
                <Text style={sStyle.secondary}>5 Comments</Text>
              </View>
            </View>
          </View>
          <View style={styles.alignright}>
            <Image 
              style={{ width: 100, height: 100 }}
              source={{
                uri: 'data:image/jpeg;base64,ZDM5OWM1ZWItZDBkOS00MTkyLWFjZmUtZWI4YmIzNGVmZWI1'
              }}
              resizeMode={FastImage.resizeMode.contain}
  
            />
            {console.log(`data:image/jpeg;base64,${imageData}`)}
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



          {/* <TouchableOpacity onPress={Bdutton} style={styles.profile_info_button}>
            <Text style={sStyle.secondary_button}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Bdutton} style={styles.profile_info_button}>
            <Text style={sStyle.secondary_button}>Log Out</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.company_contsct_btn} onPress={Bdutton} >
              <Text style={sStyle.secondary_button}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.company_contsct_btn_secondary} onPress={LogOut}>
              <Text style={sStyle.secondary_button}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

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