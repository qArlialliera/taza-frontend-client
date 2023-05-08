import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../../styles/Styles'
import { storeRole } from '../../Storage/RoleStorage';

import '../../Translations/i18n'
import { useTranslation } from 'react-i18next';

export const WelcomeChooseRole = ({navigation}) => {
    const { t } = useTranslation();
    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../Assets/images/welcome2.png')} style={styles.image}>
                <Text style={{top: '45%',color: '#fff',fontFamily: 'Lobster-Regular',fontSize: 35}}>{t('Who_are_you?')}</Text>
                <Pressable style={styles.pink_button} onPress={()=>navigation.navigate("UserRegistration")}>
                    <Text style={{fontFamily: 'mt-secondary',fontSize: 16,lineHeight: 21,letterSpacing: 0.25,color: '#414C60'}}>{t('Customer')}</Text>
                </Pressable>
                <Pressable style={styles.pink_button} onPress={()=>navigation.navigate("CompanyRegistration")}>
                    <Text style={{fontFamily: 'mt-secondary',fontSize: 16,lineHeight: 21,letterSpacing: 0.25,color: '#414C60'}}>{t('Company_Representative')}</Text>
                </Pressable>
            </ImageBackground>
        </View>
    );
}
