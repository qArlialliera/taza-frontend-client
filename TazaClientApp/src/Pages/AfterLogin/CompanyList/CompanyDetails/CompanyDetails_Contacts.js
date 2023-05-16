import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { styles } from '../../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { instance } from '../../../../Api/ApiManager';

export const CompanyDetails_Contacts = (props) => {
    const navigation = useNavigation();
    const callBtn = () => {
        Linking.openURL(`tel:${props.props.phoneNumber}`)
    }
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }
    const [userData, setUserData] = useState('');

    useEffect(() => {
      readItemFromStorage()
    //   console.log(props.props.user)
      instance.get('private/user/user-details', config).then(function (response) {
          setUserData(response.data)
      }).catch(function (error) {
          console.log(error);
      });
    
    }, [token])

    return (
        <View>
            <View>
                <View style={styles.profile_info}>
                    <Image source={require('../../../../Assets/images/ic/icon-park-outline_city.png')} style={{ marginHorizontal: 30 }} />
                    <Text style={sStyle.secondary_second}>Astana</Text>
                </View>

                <View style={styles.profile_info}>
                    <Image source={require('../../../../Assets/images/ic/ic_address.png')} style={{ marginHorizontal: 30 }} />
                    <Text style={sStyle.secondary_second}>{props.props.address}</Text>
                </View>

                <View style={styles.profile_info}>
                    <Image source={require('../../../../Assets/images/ic/ic_phone.png')} style={{ marginHorizontal: 30 }} />
                    <Text style={sStyle.secondary_second}>{props.props.phoneNumber}</Text>
                </View>

                <View style={styles.profile_info}>
                    <Image source={require('../../../../Assets/images/ic/ic_mail.png')} style={{ marginHorizontal: 30 }} />
                    <Text style={sStyle.secondary_second}>{props.props.email}</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.company_contsct_btn} onPress={callBtn}>
                    <Text style={sStyle.secondary_button}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.company_contsct_btn}
                onPress={() => navigation.navigate("Massages_Chat", {item: props.props.user, userData: userData})}>
                    <Text style={sStyle.secondary_button}>Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


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