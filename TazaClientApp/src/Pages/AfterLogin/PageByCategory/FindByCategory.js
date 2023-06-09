import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { styles } from '../../../styles/Styles'
import SearchBar from "react-native-dynamic-search-bar";
import instanceToken, { instance } from '../../../Api/ApiManager';
import { getAccessToken } from '../../../Storage/TokenStorage';
import { useNavigation } from '@react-navigation/native';
import { CompanyImages } from '../CompanyList/CompanyImages';
import { Search } from '../Home/Search';

export const FindByCategory = (props) => {
    const pp = JSON.parse(JSON.stringify(props)).route.params
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [company, setCompany] = useState("");
    const [services, setServices] = useState("");



    const SearchText = (e) => {
        setSearchText(e);
        console.log(searchText)
    }

    useEffect(() => {
        instanceToken.get(`/companies/category/${pp.id}`).then((response) => {
            setCompany(response.data)
            getServices()
        }).catch((err) => console.error(err))

    }, [])

    const getServices = () => {
        instanceToken.get(`/services/all`).then((response) => {

            setServices(response.data)
        }).catch((err) => console.error(err))
    }

    return (
        <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
            <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginBottom: 20, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BottomBar')} style={{}}>
                        <Image source={require('../../../Assets/images/ic/ri_menu-4-fill.png')} />
                    </TouchableOpacity>
                    <SearchBar
                        height={50}
                        fontSize={18}
                        fontColor="#fff"
                        iconColor="#fff"
                        shadowColor="#282828"
                        cancelIconColor="#fdfdfd"
                        spinnerVisibility={spinnerVisibility}
                        placeholder="Search..."
                        fontFamily="Nunito-Regular"
                        style={styles.searchbarWithBack}
                        onChangeText={(text) => SearchText(text)}
                    />
                    {/* <Search /> */}
                </View>
                <View style={{ backgroundColor: '#D9D9D9', borderRadius: 10, alignSelf: 'flex-start', marginHorizontal: 20, padding: 20 }}>
                    <Text style={{ color: '#404C60', fontFamily: 'Nunito-SemiBold', fontSize: 15, fontWeight: '900', letterSpacing: 0.1 }}>{pp.name}</Text>
                </View>



                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    {
                        Array.isArray(company)
                            ?
                            company.map(u => {
                                // getServices(u.id)
                                return (
                                    <View key={u.id}>
                                        <View style={styles.cont_company}>
                                            <TouchableOpacity style={styles.box_company} onPress={() => navigation.navigate('CompanyDetails', u)}>
                                                <View>
                                                    <CompanyImages props={u.photo} />
                                                    {/* <Image style={styles.image_company} source={require('../../../Assets/images/newimg.png')} /> */}
                                                </View>
                                                <View style={{ marginLeft: 30, alignItems: 'flex-start' }}>
                                                    <Text style={{ color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{u.name}</Text>
                                                    {
                                                        Array.isArray(services)
                                                            ?
                                                            services
                                                                .filter((company) => company.id === u.id)
                                                                .slice(0, 6)
                                                                .map((i, ind) => i.categories.map((j, index) => {
                                                                    return (
                                                                        <View key={j.id} style={{ backgroundColor: '#8E9AAF', borderRadius: 5, marginVertical: 4, padding: 5 }}>
                                                                            <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', }}>{j.name}</Text>
                                                                        </View>
                                                                    )

                                                                    // } 
                                                                })) : null
                                                    }


                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }) : null
                    }
                </View>
            </ImageBackground>
        </ScrollView>
    )
}
