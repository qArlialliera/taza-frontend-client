
import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../../../../styles/Styles';

export const CompanyDetails_Comments = () => {
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems:'flex-end', justifyContent: 'space-around'}}>
                <Image style={styles.msg_img} source={require('../../../../Assets/images/profile_ava.png')} />
                <View id="msg-box">
                    <Text style={{position:'absolute', zIndex:1, flexWrap: 'wrap', top: 25, left: 20, fontFamily:'Nunito-Regular', width:'85%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis purus id nunc mollis</Text>
                    <Image source={require('../../../../Assets/images/msg_box.png')} style={{maxWidth: '95%', resizeMode:'contain'}}/>
                </View>
            </View>
        </View>
    )
}