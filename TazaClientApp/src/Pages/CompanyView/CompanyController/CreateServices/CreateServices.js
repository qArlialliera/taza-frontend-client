import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, ImageBackground, Image } from 'react-native'
import { styles } from '../../../../styles/Styles'
import { useNavigation } from '@react-navigation/native'
import { instance } from '../../../../Api/ApiManager'
import { getAccessToken } from '../../../../Storage/TokenStorage'


export const CreateServices = () => {
    const navigation = useNavigation()
    const [token, setToken] = useState();
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item); console.log('item - ', item) };
    const [data, setData] = useState([]);
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    useEffect(() => {
        readItemFromStorage()
        instance.get('private/categories/all', config)
            .then(function (response) {
                setData(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [token])



    return (
        <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
            <ImageBackground source={require('../../../../Assets/images/homeBack.png')} style={styles.imageprofile}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomBarCompany')} style={{ margin: 30 }}>
                    <Image source={require('../../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                </TouchableOpacity>
                <View style={{ width: '80%', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: '#EFD3D7', fontFamily: 'Nunito-Regular', textAlign: 'center', fontSize: 20 }}>
                        Attention, add one service at a time.
                        Select the category that your company provides
                    </Text>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                        {
                            data.map((u) => {
                                return (
                                    <View key={u.id} style={{ width: '80%', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#C2CFE4', borderRadius: 11, width: '100%', padding: 20, marginTop: 5 }}
                                            onPress={() => navigation.navigate('AddPriceToService', u)} >
                                            <Text style={{ fontFamily: 'Nunito-Black', color: '#414C60', textAlign: 'center' }}>{u.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}
