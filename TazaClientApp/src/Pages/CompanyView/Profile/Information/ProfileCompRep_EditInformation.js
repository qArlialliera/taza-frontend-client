import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { instance } from '../../../../Api/ApiManagerPublic';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import Repetear from '../../../../MobX/ProfileMobxRener'
import instanceToken from '../../../../Api/ApiManager';

export const ProfileCompRep_EditInformation = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const myImage = new FormData();

  const navigation = useNavigation()

  const configMedia = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  const [companyId, setCompanyId] = useState(0);

  useEffect(() => {
    instanceToken.get('/companies/user').then((res) => {
      setName(res.data.name)
      setPhoneNumber(res.data.phoneNumber)
      setAddress(res.data.address)
      setEmail(res.data.email)
      setCompanyId(res.data.id)
      console.log(res.data)
    }).catch(err => console.log(err))

  }, []);

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
      name: `image${res.data.name}.jpg`,
      type: image.mime
    })
    instance.post('/file/save', myImage, configMedia).then((response) => {
      console.log('succesfully saved!', response.data)
      uploadPhoto(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const uploadPhoto = (photoUuid) => {
    fetch(`http://192.168.31.151:8080/private/companies/photo/upload/${companyId}/${photoUuid}`, {
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

  const saveProfile = () => {
    const company = { name, phoneNumber, email, address };
    instanceToken.put(`/companies/${companyId}`, company)
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


  return (
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../../../Assets/images/registration.png')} style={styles.back}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomBarCompany')} style={{ marginTop: 20, alignItems: 'flex-start' }}>
          <Image source={require('../../../../Assets/images/ic/ri_menu-4-fill.png')} />
        </TouchableOpacity>
        <View style={styles.container2}>
          <Text style={sStyle.primary}>Edit Company Information</Text>
          <TextInput style={styles.input} value={name} placeholder={"Company Name"} onChangeText={(text) => setName(text)} />
          <TextInput style={styles.input} value={phoneNumber} placeholder={"Phone Number"} onChangeText={(text) => setPhoneNumber(text)} />
          <TextInput style={styles.input} value={email} placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
          <TextInput style={styles.input} value={address} placeholder={"Address"} onChangeText={(text) => setAddress(text)} />
          <TouchableOpacity onPress={() => imagePicker()} style={styles.profile_info_button_secondary}>
            <Image source={require('../../../../Assets/images/upload_photo.png')} style={{ width: 40, height: 40 }} />
            <Text style={sStyle.secondary_button}>Add Profile Photo</Text>
          </TouchableOpacity>
        </View>



        <TouchableOpacity onPress={(text) => saveProfile(text)} style={styles.profile_info_button}>
          <Text style={sStyle.secondary_button}>Edit Profile</Text>
        </TouchableOpacity>

      </ImageBackground>

    </View>
  )
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