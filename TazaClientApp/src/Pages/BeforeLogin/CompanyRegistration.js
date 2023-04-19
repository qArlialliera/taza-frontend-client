
import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard } from "react-native";
import { styles } from '../../styles/Styles'
import { instance } from "../../Api/ApiManager";
import { storeAccessToken, storeRefreshToken } from "../../Storage/TokenStorage";
import { storeRole } from "../../Storage/RoleStorage";

export const CompanyRegistration = ({navigation}) => {

  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("Astana");

  const [isKeyboardOpen, setKeyboardVisible] = useState(false);
  useEffect(() => {
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
  }, []);

  const registrationCompanyReg = () => {
    // e.preventDefault();
    const user = { username, password, fullName, email, city, address, phoneNumber };
    console.log(user)

    instance.post('/public/auth/register/company-representative', user)
      .then(function (response) {
        loginUser()
        console.log('reg success', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const loginUser = () => {
    const loguser = {
      username: username,
      password: password
    }
    instance.post('public/auth/login', loguser)
      .then(function (response) {
        storeRefreshToken(response.data.refreshToken)
        storeAccessToken(response.data.accessToken)
        storeRole(response.data.roles[0].authority)
        // navigation.navigate('BottomBar')
        navigation.navigate('CreateCompanyButton')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../Assets/images/registration.png')} style={styles.image}>

        <View style={styles.container3}>
          <Text style={{ marginBottom: 20, color: '#fff', fontFamily: 'Lobster-Regular', fontSize: 30, width: '100%', textAlign: 'center'}}>Company Representative Registration</Text>
          <TextInput style={styles.input} value={fullName} placeholder={"Full Name"} onChangeText={(text) => setFullname(text)} />
          <TextInput style={styles.input} value={username} placeholder={"Username"} onChangeText={(text) => setUsername(text)} />
          <TextInput style={styles.input} value={email} placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
          <TextInput style={styles.input} value={address} placeholder={"Address"} onChangeText={(text) => setAddress(text)} />
          <TextInput style={styles.input} value={phoneNumber} placeholder={"Phone Number"} onChangeText={(text) => setPhoneNumber(text)} />
          <TextInput style={styles.input} value={password} placeholder={"Password"} secureTextEntry onChangeText={(text) => setPassword(text)} />
        </View>
        {
          !isKeyboardOpen ?
            <View style={{ width: '100%' }}>
              <View style={styles.containerButtonNext}>
                <TouchableOpacity style={styles.roundButton2} onPress={registrationCompanyReg}>
                  <Image source={require('../../Assets/images/ic/ic_arrow.png')}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.containerButtonBack}>
                <TouchableOpacity style={styles.roundButton2} onPress={()=>navigation.navigate('WelcomeChooseRole')}>
                  <Image source={require('../../Assets/images/ic/ic_arrow_back.png')}></Image>
                </TouchableOpacity>
              </View>
            </View> :
            <View></View>
        }

      </ImageBackground>

    </View>
  );
}
