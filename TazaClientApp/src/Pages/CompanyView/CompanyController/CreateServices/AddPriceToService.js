import React, { useState } from 'react'
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import { styles } from '../../../../styles/Styles'
import { useNavigation } from '@react-navigation/native';

export const AddPriceToService = (categories) => {
    const category = JSON.parse(JSON.stringify(categories)).route.params
    const [price, setPrice] = useState(0)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation()
    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../../Assets/images/registration.png')} style={styles.image}>
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateServices')} style={{ margin: 30 }}>
                        <Image source={require('../../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100, width: '90%' }}>
                    <Text style={{ color: '#EFD3D7', fontFamily: 'Nunito-Regular', textAlign: 'center', fontSize: 20 }}>Choose a price per square meter for your category</Text>
                    <View style={{ alignItems: 'center', width: '60%', marginTop: 20 }}>
                        <Text style={{ color: '#8E9AAF', fontFamily: 'Nunito-Regular', textAlign: 'center', fontSize: 20 }}>{category.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%', alignItems: 'flex-start' }}>
                            <Text style={styles.book_bodytext}>Price</Text>
                            <TextInput keyboardType="numeric" style={styles.num_input} onChangeText={(text) => setPrice(text)} />
                        </View>
                        <View style={{ flexDirection: 'column', marginTop: 20, width: '100%', alignItems: 'center'}}>
                            <Text style={styles.book_bodytext}>Is additional service?</Text>
                            <Switch
                            trackColor={{ false: '#767577', true: '#D9D9D9' }}
                            thumbColor={isEnabled ? '#CCACB3' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        </View>
                    </View>
                    <Text style={{ marginTop: 50, color: '#8E9AAF', fontFamily: 'Nunito-Regular', textAlign: 'center', fontSize: 20 }}>*All prices are approximate. They are needed for an approximate calculation of the total amount</Text>

                </View>

                <View style={styles.containerButtonNext}>
                    <TouchableOpacity style={styles.roundButton2} onPress={() => navigation.navigate('CheckData', { category, price, isEnabled })}>
                        <Image source={require('../../../../Assets/images/ic/ic_arrow.png')}></Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </View>
    )
}
