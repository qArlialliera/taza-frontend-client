import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, ImageBackground, Image } from 'react-native'
import { styles } from '../../../../styles/Styles'
import { useNavigation } from '@react-navigation/native'
import instanceToken from '../../../../Api/ApiManager'
import { getAccessToken } from '../../../../Storage/TokenStorage'
import Repetear from '../../../../MobX/ProfileMobxRener'

export const CreateServices = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([]);
    const [isActiveAccount, setActiveAccount] = useState(false);

    useEffect(() => {
        instanceToken.get('/categories/all')
            .then(function (response) {
                setData(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

            instanceToken.get('/companies/user').then(res=>{
                setActiveAccount(res.data.active)
            }).catch(err=>console.log(err))
    }, [])



    return (
        <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
            <ImageBackground source={require('../../../../Assets/images/homeBack.png')} style={styles.imageprofile}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomBarCompany')} style={{ margin: 30 }}>
                    <Image source={require('../../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                </TouchableOpacity>
                {
                    isActiveAccount ? 
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
                : 
                    <Text style={{color: '#fff',fontFamily: 'Lobster-Regular',fontSize: 30, textAlign: 'center', alignSelf: 'center', marginTop: 30}}>Please, wait until your account passes verification</Text>
                }
            </ImageBackground>
        </ScrollView>
    )
}
