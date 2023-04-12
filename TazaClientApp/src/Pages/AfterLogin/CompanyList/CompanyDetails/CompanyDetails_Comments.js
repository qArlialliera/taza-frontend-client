
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import { styles } from '../../../../styles/Styles';
import { instance } from '../../../../Api/ApiManager';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { useNavigation } from '@react-navigation/native';
import Repetear from '../../../../MobX/ProfileMobxRener'

export const CompanyDetails_Comments = (props) => {
    const pp = props.props;
    const navigation = useNavigation();

    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    //useStates
    const [review, setReview] = useState()
    const [userData, setUser] = useState()
    const [newRating, setNewRating] = useState(0)
    const [newComment, setNewComment] = useState()
    const [isEditPressed, setIsEditPressed] = useState(-1)


    useEffect(() => {
        readItemFromStorage()
        console.log
        instance.get(`/private/review/company/${pp.id}`, config).then((res) => {
            setReview(res.data)
            // else setReview(res.data)
            setNewRating(res.data.res)
            console.log(review)
        }).catch(err => console.log(err))

        instance.get('private/user/user-details', config).then((res) => {
            setUser(res.data)
        }).catch(err => console.log(err))
    }, [token])

    const putNewReview = (id) => {
        const data = { comment: newComment, rate: newRating }
        // console.log('data - ', data, '; id - ', id)
        instance.put(`/private/review/${id}`, data, config).then((res) => {
            // console.log(res.data)
            setIsEditPressed(-1)
            Repetear.trigger();
        }).catch(err => console.log(err))
        
    }

    return (
        <View style={{ width: '100%' }}>
            {
                // Array.isArray(review)
                review 
                    ?
                    review.map((r) => {
                        return (
                                <View key={r.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10, width: '100%' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Image style={styles.msg_img} source={require('../../../../Assets/images/profile_ava.png')} />
                                        <Text style={{ fontFamily: 'Nunito-Black', color: '#D9D9D9', marginTop: 5 }}>{r.user.fullName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: '80%', }}>
                                        <View style={styles.msgBox}>
                                            <View style={{ alignItems: 'flex-end' }}>
                                                <AirbnbRating
                                                    ratingCount={5}
                                                    defaultRating={r.rate}
                                                    size={15}
                                                    selectedColor='#414C60'
                                                    ratingBackgroundColor='#D9D9D9'
                                                    showRating={false}
                                                    isDisabled={true}
                                                />
                                            </View>
                                            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 15, color: '#000000', marginVertical: 2 }}>{r.comment}</Text>
                                        </View>
                                        {
                                            r.user.id === isEditPressed ?
                                                <View style={styles.msgBox}>
                                                    {/* <Text>ogfkrml</Text> */}
                                                    <Text style={{ fontFamily: 'Nunito-Black', fontSize: 18, alignSelf: 'center', color: '#414C60' }}>Edit review</Text>
                                                    <AirbnbRating
                                                        ratingCount={5}
                                                        defaultRating={r.rate}
                                                        size={30}
                                                        selectedColor='#414C60'
                                                        ratingBackgroundColor='#D9D9D9'
                                                        showRating={false}
                                                        onFinishRating={(e) => setNewRating(e)}
                                                    />
                                                    <TextInput style={styles.inputTextWithBorder} placeholder="Your Comments" onChangeText={(text) => setNewComment(text)}></TextInput>
                                                    <TouchableOpacity style={styles.profile_info_button} onPress={()=>putNewReview(r.id)}>
                                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-SemiBold', fontSize: 15, }}>Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                : null
                                        }
                                        {
                                            r.user.id === userData?.id && isEditPressed < 0 ?

                                                <TouchableOpacity style={styles.profile_info_button} onPress={() => setIsEditPressed(r.user.id)}>
                                                    <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-SemiBold', fontSize: 15, }}>Edit Review</Text>
                                                </TouchableOpacity> : null
                                        }
                                    </View>
                                </View>
                            // </ScrollView>

                        )
                    })
                    : 
                    // <Image source={require('../../../../Assets/images/comment_empty.png')}/>
                    null
                    
            }
        </View>
    )
}