import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../../styles/Styles'
import { storeRole } from '../../Storage/RoleStorage';



export const WelcomeChooseRole = ({navigation}) => {

    
    // const CompanyButton = () => {
    //     navigation.navigate('Welcome2')
    // }
    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../Assets/images/welcome2.png')} style={styles.image}>
                <Text style={{top: '45%',color: '#fff',fontFamily: 'Lobster-Regular',fontSize: 35}}>Who are you?</Text>
                <Pressable style={styles.pink_button} onPress={()=>navigation.navigate("UserRegistration")}>
                    <Text style={{fontFamily: 'mt-secondary',fontSize: 16,lineHeight: 21,letterSpacing: 0.25,color: '#414C60'}}>Customer</Text>
                </Pressable>
                <Pressable style={styles.pink_button} onPress={()=>navigation.navigate("CompanyRegistration")}>
                    <Text style={{fontFamily: 'mt-secondary',fontSize: 16,lineHeight: 21,letterSpacing: 0.25,color: '#414C60'}}>Company Representative</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
}
