import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/Styles'
import { instance } from "../../../Api/ApiManager";
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../../Storage/TokenStorage';
import {removeRole} from '../../../Storage/RoleStorage'
import { observer } from 'mobx-react-lite'
import Repetear from '../../../MobX/ProfileMobxRener'



export const Profile = observer(({ navigation }) => {
  const [data, setData] = useState("");
  const [orderCount, setOrderCount] = useState('');
  const [commentCount, setCommentCount] = useState('');
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const removeRefreshFromStorage = async () => { const item = await removeRefreshToken() };
  const removeAccessFromStorage = async () => { const item = await removeAccessToken() };
  const removeRoleFromtorage = async () => { const item = await removeRole() };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const [imageData, setImageData] = useState(null);


  useEffect(() => {
    readItemFromStorage()
    instance.get('private/user/user-details', config).then(function (response) {
        setData(response.data)
        getImage(response.data.photo)

        instance.get(`/private/user/orders/count/${response.data.id}`, config).then(res=>{
          setOrderCount(res.data)
          console.log(res.data)
        }).catch(err => console.error(err))
        instance.get(`/private/user/reviews/count/${response.data.id}`, config).then(res=>setCommentCount(res.data)).catch(err => console.error(err))
      }).catch(function (error) {
        console.log(error);
      });

    
  }, [token, Repetear.bool])

  const Bdutton = () => {
    navigation.navigate("edit_profile")
  }
  const getImage = (uuid) => {
    console.log(uuid)
    instance.get(`/public/file/photo/get/${uuid}`, { responseType: 'blob' }).then((response) => {
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
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
        <View style={styles.containerhead}>
          <View>
            <View><Text style={sStyle.primary}>{data.fullName}</Text></View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={styles.icons}>
                <Image source={require('../../../Assets/images/profile_order.png')} style={{ borderColor: '#8E9AAF', borderWidth: 2, borderRadius: 100 }}></Image>
                <Text style={sStyle.secondary}>{orderCount} Order</Text>
              </View>
              <View style={styles.icons}>
                <Image source={require('../../../Assets/images/profile_comment.png')} style={{ borderColor: '#8E9AAF', borderWidth: 2, borderRadius: 100 }}></Image>
                <Text style={sStyle.secondary}>{commentCount} Comments</Text>
              </View>
            </View>
          </View>
          <View style={styles.alignright}>

            {imageData && <Image source={{ uri: imageData }} style={styles.image_avater} />}
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