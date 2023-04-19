import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../../styles/Styles'





export const Welcome2 = ({ navigation }) => {
    const loadSceneRegistration = () =>{ navigation.navigate('WelcomeChooseRole')}
    const loadSceneLogin = () =>{ navigation.navigate('UserLogin')}
        return (
            <View style={styles.containerwellcome}>
                <ImageBackground source={require('../../Assets/images/welcome2.png')} style={styles.image}>
                    <Text style={{top: '45%',color: '#fff',fontFamily: 'Lobster-Regular',fontSize: 35}}>Join to us</Text>
                    <Pressable style={styles.pink_button} onPress={loadSceneRegistration}>
                        <Text style={{fontFamily: 'mt-secondary',fontSize: 16,lineHeight: 21,letterSpacing: 0.25,color: '#414C60'}}>Registration</Text>
                    </Pressable>
                    <Pressable style={styles.pink_button} onPress={loadSceneLogin}>
                        <Text style={{fontFamily: 'mt-secondary',fontSize: 16,lineHeight: 21,letterSpacing: 0.25,color: '#414C60'}}>Login</Text>
                    </Pressable>
                </ImageBackground>
            </View>
        );
};