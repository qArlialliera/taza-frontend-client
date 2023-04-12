import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { styles } from '../../../styles/Styles'
import { getAccessToken } from '../../../Storage/TokenStorage';
import { instance } from '../../../Api/ApiManager';



export const SpecialOffers = ({navigation}) => {
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    const [data, setData] = useState()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        readItemFromStorage()   
        instance.get('/private/offers', config).then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch((err) => {
            console.log(err)
            setReload(true)
        })

    }, [reload])

    return (
        <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
            <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginTop: 50, marginBottom: 20, color: '#FFFFFF', fontFamily: 'Lobster-Regular', fontSize: 25 }}>Special offers</Text>
                    {
                        Array.isArray(data)
                        ?
                        data.map((u, index) => {
                            return (
                                <TouchableOpacity style={{ width: '85%' }} key={index} onPress={() => navigation.navigate('CompanyDetails', u.company)}>
                                    <View style={styles.msgBox} >
                                        <Text style={{ color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 20 }}>{u.company.name}</Text>
                                        <Text style={{ color: '#111111', fontFamily: 'Nunito-Regular', fontSize: 15, marginVertical: 7 }}>{u.offer}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }):null
                    }

                </View>
            </ImageBackground>
        </ScrollView>
    )
}
