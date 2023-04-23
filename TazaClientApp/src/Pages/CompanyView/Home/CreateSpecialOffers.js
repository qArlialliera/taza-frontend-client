import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native'
import { styles } from '../../../styles/Styles'
import { instance } from '../../../Api/ApiManager'
import { getAccessToken } from '../../../Storage/TokenStorage'
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native'
import Repetear from '../../../MobX/ProfileMobxRener'

export const CreateSpecialOffers = () => {
    const [text, setText] = useState('')
    // const [id, setId] = useState('')
    const [company, setCompany] = useState('')

    const [isModalVisible, setModalVisible] = useState(false)
    
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }
  
    const navigation = useNavigation()

  
    useEffect(() => {
      readItemFromStorage()
      instance.get('/private/companies/user', config).then(res=> setCompany(res.data)).catch(err => console.log(err))
    }, [token])


    const createSpecialOffer = () =>{
        const data = {
            offer: text,
            company: company
        }
        console.log(data)
        instance.post(`/private/offers`, data, config)
        .then(res=>setModalVisible(true))
        .catch(err => console.log(err))
        Repetear.trigger()

    }

    const returnToProfile = () =>{
        setModalVisible(false)
        navigation.navigate("BottomBarCompany")
    }

    const WrapperComponent = () => {
        return (
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={returnToProfile}>
                            <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Offer Created!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={returnToProfile}>
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
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>
                <WrapperComponent />
                <Text style={{ marginBottom: 20, color: '#D9D9D9', fontFamily: 'Lobster-Regular', fontSize: 25, marginTop: 50 }}>Create Special Offers</Text>
                <View style={{ width: '85%' }}>
                    <TextInput
                        style={styles.inputTextSpecial}
                        multiline={true}
                        placeholder="For example: 10% discount for the first 10 customers!"
                        onChangeText={(t) => setText(t)}></TextInput>

                    <TouchableOpacity style={styles.profile_info_button} onPress={createSpecialOffer}>
                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Create Special Offer</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
