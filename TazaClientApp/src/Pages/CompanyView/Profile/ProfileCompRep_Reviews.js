import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import { styles } from '../../../styles/Styles'
import { useNavigation } from '@react-navigation/native';
import { getAccessToken } from '../../../Storage/TokenStorage';
import { instance } from '../../../Api/ApiManager';
import { AvatarImage } from '../../AfterLogin/CompanyList/CompanyDetails/AvatarImage';
import { t } from 'i18next';
import Repeater from '../../../MobX/ProfileMobxRener'
import { observer } from 'mobx-react-lite';


export const ProfileCompRep_Reviews = observer((props) => {
  const pp = props.props;
  const navigation = useNavigation();

  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } };

  //useStates
  const [review, setReview] = useState()
  const [myData, setMyData] = useState()

  const [newComment, setNewComment] = useState()
  const [isAnswer, setIsAnswer] = useState(-1)


  useEffect(() => {
    readItemFromStorage()
    console.log(review)

    instance.get(`/private/review/company/${pp.id}`, config).then((res) => {
      setReview(res.data)
      setNewRating(res.data.res)

    }).catch(err => console.log(err))

    instance.get('private/user/user-details', config).then((res) => {
      setMyData(res.data)
    }).catch(err => console.log(err))
  }, [token, Repeater.bool])

  const AddComment = (parentId) => {
    const data = {
      user: {
        id: myData.id
      },
      parentId: parentId,
      text: newComment,
      review: {
        id: parentId

      }
    }

    instance.post(`/private/comments/add`, data, config).then(res => {
      Repeater.trigger()
      setIsAnswer(-1)
    }).catch(err => console.log(err))
  }

  return (
    <View style={{ width: '100%' }}>
      {
        review
          ?
          review.map((r) => {
            return (
              <View key={r.id} style={{ flexDirection: 'row', marginVertical: 10, width: '100%' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                  {/* <Image style={styles.msg_img} source={require('../../../../Assets/images/profile_ava.png')} /> */}
                  <AvatarImage props={r.user.photo} />
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
                    {r.comments[0] ? <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 15, color: '#000000', marginVertical: 2 }}>{r.comments[0].text}</Text> : null}


                  </View>




                  {
                    r.comments[1]
                      ?
                      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                          <AvatarImage props={pp.photo} />
                          <Text style={{ fontFamily: 'Nunito-Black', color: '#D9D9D9', marginTop: 5 }}>{pp.name}</Text>
                        </View>
                        <View style={styles.msgBox2}>
                          <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 15, color: '#000000', marginVertical: 2 }}>{r.comments[1].text}</Text>
                        </View>
                      </View>
                      : 
                      <TouchableOpacity style={styles.btn_RedNew} onPress={() => setIsAnswer(r.id)}>
                        <Text style={{ fontFamily: 'Nunito-SemiBold', color: '#414C60', fontSize: 15, textAlign: 'center' }}>{t('Answer')}</Text>
                      </TouchableOpacity>
                  }




                  {
                    r.id === isAnswer ?
                      <View style={styles.msgBox}>
                        <Text style={{ fontFamily: 'Nunito-Black', fontSize: 15, alignSelf: 'center', color: '#414C60' }}>Answer to review</Text>
                        <TextInput
                          style={styles.inputTextWithBorder}
                          multiline={true}
                          placeholder="Your Comments"
                          onChangeText={(text) => setNewComment(text)}></TextInput>

                        <TouchableOpacity style={styles.profile_info_button} onPress={() => AddComment(r.id)}>
                          <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-SemiBold', fontSize: 15, }}>Answer</Text>
                        </TouchableOpacity>
                      </View>
                      : null
                  }
                </View>
              </View>

            )
          })
          :

          null

      }
    </View>
  )
})
