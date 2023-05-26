import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../../styles/Styles'
import instanceToken from '../../../Api/ApiManager';
import { AvatarImage } from '../CompanyList/CompanyDetails/AvatarImage';
import { t } from 'i18next';
import { useNavigation } from '@react-navigation/native';

export const AllOrderListUser = () => {

    const navigation = useNavigation()
        useEffect(() => {
            getUserData()
        }, [])
    
        const getUserData = () => {
            instanceToken.get('/user/user-details').then((res) => {
                getOrders(res.data.id)
            }).catch(err => console.log(err))
        }
        const [orderData, setOrderData] = useState()
        const getOrders = (userId) => {
            instanceToken.get(`/orders/user/${userId}`).then(res => {
                setOrderData(res.data)
                console.log(res.data)
            }).catch(err => console.log(err))
    
        }

    return (
        <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
            <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ alignItems: 'center', marginTop: 50, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Last Orders')}</Text>
                    {
                        Array.isArray(orderData) && orderData.map((item) => {
                            const date = new Date(item.date);
                            const dateString = date.toLocaleDateString();
                            const timeString = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
                            return (
                                <TouchableOpacity
                                    style={{ backgroundColor: '#D9D9D9', borderRadius: 20, flexDirection: 'row', padding: 20, alignItems: 'center', marginBottom: 10 }}
                                    onPress={() => navigation.navigate("HomeOrders", { item })}>
                                    <AvatarImage props={item.companyService.company[0].photo}></AvatarImage>
                                    <View style={{ marginVertical: 5 }}>
                                        <Text style={{ fontFamily: 'Nunito-Bold', color: '#414C60', fontSize: 17 }}>{item.companyService.company[0].name}</Text>
                                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.companyService.categories[0].name}</Text>
                                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>Date and time - {dateString}, {timeString}</Text>

                                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                                            {
                                                item.status.id === 1
                                                    ? <View style={styles.button_lightYellow}>
                                                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.status.name}</Text>
                                                    </View>
                                                    : null
                                            }
                                            {
                                                item.status.id === 2
                                                    ? <View style={styles.button_lightBlue}>
                                                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.status.name}</Text>
                                                    </View>
                                                    : null
                                            }
                                            {
                                                item.status.id === 3
                                                    ? <View style={styles.button_lightGreen}>
                                                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.status.name}</Text>
                                                    </View>
                                                    : null
                                            }
                                            {
                                                item.status.id === 4
                                                    ? <View style={styles.button_red}>
                                                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.status.name}</Text>
                                                    </View>
                                                    : null
                                            }
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )

                        }).reverse()
                    }



                </View>

            </ImageBackground>
        </ScrollView>
    )
}
