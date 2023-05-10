import React, { useEffect, useState } from 'react'
import { ImageBackground, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../../styles/Styles'
import { Search } from './Search';
import '../../../Translations/i18n'
import { useTranslation } from 'react-i18next';
import { getLanguage } from '../../../Storage/LanguageStorage';
import { getRole } from '../../../Storage/RoleStorage';
import { instance } from '../../../Api/ApiManager';
import { getAccessToken } from '../../../Storage/TokenStorage';
import { AvatarImage } from '../CompanyList/CompanyDetails/AvatarImage';


const DATA = [
    { id: 1, name: 'General Cleaning', img: require('../../../Assets/images/icon_general.png') },
    { id: 2, name: 'Wet Cleaning', img: require('../../../Assets/images/icon_wet.png') },
    { id: 4, name: 'Cleaning after repair', img: require('../../../Assets/images/icon_repair.png') },
    { id: 3, name: 'Office Cleaning', img: require('../../../Assets/images/icon_office.png') },
]




export const Home = ({ navigation }) => {


    //token
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    //language
    const { t, i18n } = useTranslation();
    const [language, setStorageLanguage] = useState();
    const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };
    const [currentLanguage, setLanguage] = useState();


    //roles
    const [role, setRole] = useState();
    const readRoleFromStorage = async () => { const item = await getRole(); setRole(item); };

    //other
    const [isOrderInProccess, setOrderInProccess] = useState(false);
    const [orderData, setOrderData] = useState()

    useEffect(() => {
        readLanguage()
        readRoleFromStorage()
        readItemFromStorage()
        if (role === 'ROLE_COMPANY') navigation.navigate('BottomBarCompany')


        console.log(language)
        changeLanguage(language)
        getUserData()
    }, [language, token])

    const getUserData = () => {
        instance.get('/private/user/user-details', config).then((res) => {
            getOrders(res.data.id)
        }).catch(err => console.log(err))
    }

    const getOrders = (userId) => {
        instance.get(`/private/orders/user/${userId}`, config).then(res => {
            setOrderData(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))

    }

    const changeLanguage = (value) => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    const ReplaceWithAll = () => {
        navigation.navigate("all_categories")
    }
    return (
        <ScrollView style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>



                <Search onPress={() => navigation.navigate("CompanyList")} />
                <TouchableOpacity style={styles.divspecial} onPress={() => navigation.navigate('SpecialOffers')}>
                    <Text style={{ alignItems: 'center', color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Special_Offers')}</Text>
                </TouchableOpacity>
                <Text style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Nunito-SemiBold', fontSize: 20 }}>{t('Select by category')}</Text>
                <View>
                    <View style={styles.grid}>
                        {
                            DATA.map((u) => {
                                return (
                                    <View key={u.id} >
                                        <TouchableOpacity style={styles.card_category} onPress={() => navigation.navigate('FindByCategory', u)}>
                                            <Image style={styles.image_card} resizeMode="cover" source={u.img} />
                                            <Text style={styles.name}>{i18n.t(u.name)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }

                    </View>
                    <TouchableOpacity style={styles.button} onPress={ReplaceWithAll}>
                        <Text style={{ color: '#414C60', fontFamily: 'Nunito-SemiBold', fontSize: 15, top: '25%', }}>{t('All Categories')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 50 }}>
                    {
                        Array.isArray(orderData) && orderData.map((item) => {
                            const date = new Date(item.date);
                            const dateString = date.toLocaleDateString();
                            const timeString = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
                            if (item.status.id === 1 || item.status.id === 2) {
                                return (
                                    <TouchableOpacity
                                        style={
                                            item.status.id === 1
                                                ? { ...styles.lastOrderYellow }
                                                : { ...styles.lastOrderBlue }
                                        }
                                        onPress={() => navigation.navigate("HomeOrders", { item })}>
                                        <AvatarImage props={item.companyService.company[0].photo}></AvatarImage>
                                        <View style={{ marginVertical: 5 }}>
                                            <Text style={{ fontFamily: 'Nunito-Bold', color: '#414C60', fontSize: 17 }}>{item.companyService.company[0].name}</Text>
                                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.companyService.categories[0].name}</Text>
                                            <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>Date and time - {dateString}, {timeString}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }


                </View>

                <View style={{ width: '85%', marginVertical: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllOrderListUser')}>
                            <Text style={{ color: '#414C60', fontFamily: 'Nunito-SemiBold', fontSize: 15, top: '25%', }}>{t('All Orders')}</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>

        </ScrollView>
    )
}