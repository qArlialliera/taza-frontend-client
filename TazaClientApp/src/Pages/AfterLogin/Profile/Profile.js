import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/Styles'
import { instance } from "../../../Api/ApiManager";
import { getAccessToken } from '../../../Storage/TokenStorage';
import {observer} from 'mobx-react-lite'
import Repetear from '../../../MobX/ProfileMobxRener'


export const Profile = observer( ({ navigation }) => {
  const [data, setData] = useState("");
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => {const item = await getAccessToken();setToken(item)};

  const config = {headers: {'Authorization': 'Bearer ' + token}}
  useEffect(() => {
    readItemFromStorage()
    console.log('e == ', token)
    instance.get('private/user/user-details', config)
      .then(function (response) {
        setData(response.data)

        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token,Repetear.bool])
 
  const Bdutton = () => {
    navigation.navigate("edit_profile")
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
            <Image source={require('../../../Assets/images/profile_ava.png')} />
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

          

          <TouchableOpacity onPress={Bdutton} style={styles.profile_info_button}>
            <Text style={sStyle.secondary_button}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    </View>
  )
})

const sStyle = StyleSheet.create({

  primary: {
    alignItems:'center',
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