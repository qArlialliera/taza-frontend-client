import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { styles } from '../../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';

export const CompanyDetails_Contacts = (props) => {
    const navigation = useNavigation();
    const callBtn = () => {
        Linking.openURL(`tel:${props.props.phoneNumber}`)
    }
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
                onPress={() => navigation.navigate("Massages_Chat", props.props)}>
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