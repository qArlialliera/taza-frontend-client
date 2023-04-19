import React, { useEffect, useState } from 'react'
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../../../styles/Styles'
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { instance } from '../../../../Api/ApiManager';
import Repetear from '../../../../MobX/ProfileMobxRener'

export const CheckData = (props) => {
    const categoryData = JSON.parse(JSON.stringify(props)).route.params
    console.log(categoryData)

    const navigation = useNavigation()

    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    const [companyData, setCompanyData] = useState('')
    useEffect(() => {
        readItemFromStorage()
        instance.get('/private/companies/user', config).then((res) => {
            setCompanyData(res.data)

          }).catch(err => console.log(err))
    }, [token])
    
    const addService = () => {
        const serviceData = {
            categories: [{
                id: categoryData.category.id
            }],
            company: [{
                id: companyData.id
            }],
            price: categoryData.price
        }
        instance.post('/private/services/add', serviceData, config).then((res)=>{
            console.log('data', res.data)
            navigation.navigate('BottomBarCompany')
            Repetear.trigger()
        }).catch(err => console.log(err))
    }
    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../../Assets/images/registration.png')} style={styles.image}>
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddPriceToService', categoryData.category)} style={{ margin: 30 }}>
                        <Image source={require('../../../../Assets/images/ic/material-symbols_arrow-forward-ios-rounded.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100, width: '85%' }}>
                    <Text style={{ color: '#EFD3D7', fontFamily: 'Nunito-Regular', textAlign: 'center', fontSize: 20 }}>Check the information</Text>
                    <View style={{ marginTop: 50 }}>
                        <Text style={styles.secondary}>Category: </Text>
                        <View style={{ backgroundColor: '#C2CFE4', borderRadius: 11, width: '100%', padding: 20, marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-Black', color: '#414C60', textAlign: 'center' }}>{categoryData.category.name}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Text style={styles.secondary}>Price:  </Text>
                        <View style={{ backgroundColor: '#C2CFE4', borderRadius: 11, width: '100%', padding: 20, marginVertical: 5 }}>
                            <Text style={{ fontFamily: 'Nunito-Black', color: '#414C60', textAlign: 'center' }}>{categoryData.price}</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtonNext}>
                        <TouchableOpacity style={styles.roundButton2} onPress={addService}>
                            <Image source={require('../../../../Assets/images/ic/ic_arrow.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
