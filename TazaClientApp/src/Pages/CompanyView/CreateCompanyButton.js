import React, { useState } from 'react'
import { View, ScrollView, ImageBackground, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../styles/Styles'

export const CreateCompanyButton = ({navigation}) => {
    return (
      <View style={styles.containerwellcome}>
        <ImageBackground source={require('../../Assets/images/homeBack.png')} style={styles.back}>
              <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 25, textAlign: 'center', marginVertical: 40}}> You don't have any companies. Please add</Text>
                <TouchableOpacity style={styles.company_contsct_btn} onPress={() => navigation.navigate('CreateCompany')} >
                  <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Create company</Text>
                </TouchableOpacity>
              </View>
        </ImageBackground>
      </View>
    )
  }
