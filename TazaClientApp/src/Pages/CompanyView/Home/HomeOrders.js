

import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { styles } from '../../../styles/Styles'
import { instance } from '../../../Api/ApiManager'
import { t } from 'i18next';
import { getAccessToken } from '../../../Storage/TokenStorage';
import { getRole } from '../../../Storage/RoleStorage';
import Modal from "react-native-modal";
import Repetear from '../../../MobX/ProfileMobxRener'
import { AirbnbRating } from 'react-native-ratings';


export const HomeOrders = (props) => {
    const pp = JSON.parse(JSON.stringify(props)).route.params
    const [imageData, setImageData] = useState(null);

    //token
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    //role
    const [role, setRole] = useState();
    const readRoleFromStorage = async () => { const item = await getRole(); setRole(item); };

    const toggleSwitch = () => console.log('notChangable')

    const date = new Date(pp.item.date);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [newRating, setNewRating] = useState(0)
    // const [isUser, setIsUser] = useState(false);
    const [comments, setOtherComments] = useState();
    useEffect(() => {
        console.log(pp)
        readItemFromStorage()
        readRoleFromStorage()
        instance.get(`/public/file/photo/get/${pp.item.user.id}`, { responseType: 'blob' }).then((response) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
            };
            reader.readAsDataURL(response.data);

        }).catch(err => console.error(err))

    }, [token])

    const ChangeOrder = (myId) => {
        const data = { id: myId }
        instance.put(`/private/orders/change-status/${pp.item.id}`, data, config).then(res => {
            console.log(res)
            Repetear.trigger()
            setModalVisible(true)
        }).catch(err => alert('Whops...'))
    }

    const sendReview = () => {
        const data = {
            user: {
                id: pp.item.user.id
            },
            company: {
                id: pp.item.companyService.company[0].id,
            },
            rate: newRating,
            text: comments
        }
        // console.log(data)
        instance.post(`/private/review/add`, data, config).then(res=>{
            console.log('SENDED')
            setModalVisible2(true)
            setOtherComments('')
            setNewRating(0)
        }).catch(err=>console.log(err))
    }

    const toggleModal = () => {setModalVisible(false);};
    const toggleModal2 = () => {setModalVisible2(false);};

    const WrapperComponent = () => {
        return (
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                            <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Order Status was Changed!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={toggleModal}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }

    const WrapperComponent2 = () => {
        return (
            <View>
                <Modal isVisible={isModalVisible2}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal2} >
                            <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Thank you for your review!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={toggleModal}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }

    return (
        <ScrollView style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
                <WrapperComponent />
                <WrapperComponent2 />
                <View style={{ flexDirection: 'row', marginHorizontal: 80, marginTop: 50, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '70%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={sStyle.primary}>{pp.item.user.fullName}</Text>
                        {
                            pp.item.status.id === 1
                                ? <View style={styles.button_lightYellow}>
                                    <Text style={sStyle.secondary_second2}>{pp.item.status.name}</Text>
                                </View>
                                : null
                        }
                        {
                            pp.item.status.id === 2
                                ? <View style={styles.button_lightBlue}>
                                    <Text style={sStyle.secondary_second2}>{pp.item.status.name}</Text>
                                </View>
                                : null
                        }
                        {
                            pp.item.status.id === 3
                                ? <View style={styles.button_lightGreen}>
                                    <Text style={sStyle.secondary_second2}>{pp.item.status.name}</Text>
                                </View>
                                : null
                        }
                        {
                            pp.item.status.id === 4
                                ? <View style={styles.button_red}>
                                    <Text style={sStyle.secondary_second2}>{pp.item.status.name}</Text>
                                </View>
                                : null
                        }
                    </View>
                    {
                        imageData
                            ? <Image source={{ uri: imageData }} style={styles.image_avater} />
                            : <Image source={require('../../../Assets/images/profile_ava.png')} style={styles.image_avater} />
                    }
                </View>

                {
                    role === 'ROLE_USER' && pp.item.status.id === 3
                        ?
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            <Text style={styles.book_bodytext}>Please, write a comment</Text>
                            <AirbnbRating
                                ratingCount={5}
                                defaultRating={0}
                                size={30}
                                selectedColor='#EFD3D7'
                                ratingBackgroundColor='#D9D9D9'
                                showRating={false}
                                onFinishRating={(e) => setNewRating(e)}
                            />
                            <TextInput 
                            style={styles.inputText2} 
                            multiline={true} 
                            value={comments}
                            placeholder="Your Comments" 
                            onChangeText={(text) => setOtherComments(text)}></TextInput>
                            <View style={{ width: '80%', marginBottom: 50 }}>
                                <TouchableOpacity style={styles.company_contsct_btn_secondary} onPress={sendReview}>
                                    <Text style={sStyle.secondary_button}>{t('Send')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                }

                <Text style={{ fontFamily: 'Lobster-Regular', fontSize: 22, color: '#fff', textTransform: 'capitalize', alignSelf: 'center' }}>Information about order</Text>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, color: '#fff', textTransform: 'capitalize', alignSelf: 'center', marginBottom: 30 }}>{pp.item.companyService.categories[0].name}</Text>

                <View style={{ marginHorizontal: 50 }}>
                    <View style={styles.profile_info}>
                        <Image source={require('../../../Assets/images/ic/icon-park-outline_city.png')} style={{ marginHorizontal: 30 }} />
                        <Text style={sStyle.secondary_second}>{pp.item.user.city}</Text>
                    </View>

                    <View style={styles.profile_info}>
                        <Image source={require('../../../Assets/images/ic/ic_address.png')} style={{ marginHorizontal: 30 }} />
                        <Text style={sStyle.secondary_second}>{pp.item.user.address}</Text>
                    </View>

                    <View style={styles.profile_info}>
                        <Image source={require('../../../Assets/images/ic/ic_phone.png')} style={{ marginHorizontal: 30 }} />
                        <Text style={sStyle.secondary_second}>{pp.item.user.phoneNumber}</Text>
                    </View>

                    <View style={styles.profile_info}>
                        <Image source={require('../../../Assets/images/ic/ic_mail.png')} style={{ marginHorizontal: 30 }} />
                        <Text style={sStyle.secondary_second}>{pp.item.user.email}</Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.book_bodytext}>Area(m2)</Text>
                        <View style={styles.num_input}>
                            <Text style={sStyle.primary2}>{pp.item.area}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.book_bodytext}>Rooms</Text>
                        <View style={styles.num_input}>
                            <Text style={sStyle.primary2}>{pp.item.rooms}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Animals</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#D9D9D9' }}
                            thumbColor={pp.item.withPet ? '#CCACB3' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={pp.item.withPet}
                            style={{ position: 'absolute', left: '50%' }}
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Date and Time</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                            <View style={styles.dateTimeBtn}>
                                <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold', textAlign: 'center' }}>Selected Date - {dateString}</Text>
                            </View>

                            <View style={styles.dateTimeBtn}>
                                <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold', textAlign: 'center' }}>Selected Time - {timeString}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Extra Features</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {
                                pp.item.additionalServices ?
                                    pp.item.additionalServices.map((i) =>
                                        i.categories.map((j) => {
                                            return (
                                                <View key={j.id}>
                                                    <TouchableOpacity
                                                        style={{
                                                            backgroundColor: '#FEC7CF',
                                                            marginTop: 5,
                                                            paddingHorizontal: 20,
                                                            paddingVertical: 10,
                                                            borderRadius: 17,
                                                            marginHorizontal: 5,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Nunito-Regular',
                                                                color: '#414C60',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {j.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }

                                        )
                                    )

                                    : null
                            }
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Comments</Text>
                    </View>
                    {
                        pp.item.comment ?
                            <View style={styles.inputText}>
                                <Text style={sStyle.secondary_second2}>{pp.item.comment}</Text>
                            </View>
                            : null
                    }


                    {
                        role === 'ROLE_COMPANY'
                            ? <View>
                                {
                                    pp.item.status.id === 1 ?
                                        <View style={{ marginTop: 30 }}>
                                            <TouchableOpacity style={styles.button_lightBlue} onPress={() => ChangeOrder(2)}>
                                                <Text style={sStyle.secondary_second2}>Accept</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button_red} onPress={() => ChangeOrder(4)}>
                                                <Text style={sStyle.secondary_second2}>Cancel order</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ marginTop: 30 }}>
                                            <TouchableOpacity style={styles.button_lightGreen} onPress={() => ChangeOrder(3)}>
                                                <Text style={sStyle.secondary_second2}>Mark as completed</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.button_red} onPress={() => ChangeOrder(4)}>
                                                <Text style={sStyle.secondary_second2}>Cancel order</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                            :
                            null
                    }
                    {/* {
                    pp.item.status != 3 || pp.item.status !=4 ?
                    
                        pp.item.status.id === 1 ?
                            <View style={{ marginTop: 30 }}>
                                <TouchableOpacity style={styles.button_lightBlue} onPress={() => ChangeOrder(2)}>
                                    <Text style={sStyle.secondary_second2}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button_red} onPress={() => ChangeOrder(4)}>
                                    <Text style={sStyle.secondary_second2}>Cancel order</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ marginTop: 30 }}>
                                <TouchableOpacity style={styles.button_lightGreen} onPress={() => ChangeOrder(3)}>
                                    <Text style={sStyle.secondary_second2}>Mark as completed</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button_red} onPress={() => ChangeOrder(4)}>
                                    <Text style={sStyle.secondary_second2}>Cancel order</Text>
                                </TouchableOpacity>
                            </View>

                    
                    : null
                   } */}


                </View>
            </ImageBackground>
        </ScrollView>
    )
}
const sStyle = StyleSheet.create({

    primary: {
        marginVertical: 20,
        color: '#fff',
        fontFamily: 'Lobster-Regular',
        fontSize: 25
    },
    primary2: {
        alignItems: 'center',
        color: '#414C60',
        fontFamily: 'Lobster-Regular',
        fontSize: 20,
        alignSelf: 'center',

    },
    secondary: {
        top: '15%',
        color: '#fff',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 15
    },
    secondary_second: {
        color: '#404C60',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 15,
        position: 'absolute',
        left: '30%',
        fontWeight: '900',
        letterSpacing: 0.1
    },
    secondary_second2: {
        color: '#404C60',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 0.1,
        // marginTop: 20
    },
    secondary_button: {
        color: '#D9D9D9',
        fontFamily: 'Nunito-Black',
        fontSize: 15,
    },

});