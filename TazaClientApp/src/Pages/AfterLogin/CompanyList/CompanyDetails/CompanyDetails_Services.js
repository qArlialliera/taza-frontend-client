import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from '../../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { instance } from '../../../../Api/ApiManager';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { Services_Mapping } from './Services_Mapping';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { CompanyImages } from '../CompanyImages';


export const CompanyDetails_Services = (props) => {
  const pp = props.props;
  const navigation = useNavigation();
  //token
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }
  //useStates
  const [services, setServices] = useState([]);
  const [offer, setOffer] = useState()
  const [showFullText, setShowFullText] = useState(false);


  useEffect(() => {
    readItemFromStorage()
    console.log(pp)
    instance.get(`/private/services/company/${pp.id}`, config).then((response) => {
      setServices(response.data)
    }).catch((err) => {
      console.error(err)
    })


    instance.get('/private/offers', config).then((res) => {
      console.log(res.data)
      setOffer(res.data)
    }).catch(err => console.log(err))

  }, [token])

  const onSwipeLeft = () => {
    console.log('swiped left!')
  }

  return (
    <View>
      {
        Array.isArray(offer)
          ?
          offer.map((u, index) => {
            if (pp.id === u.company.id) {
              return (
                // <PanGestureHandler onSwipeLeft={(state) => onSwipeLeft(state)}>
                <TouchableOpacity key={index} onPress={() => setShowFullText(!showFullText)}
                  onTouchStart={e => this.touchY = e.nativeEvent.pageY}
                  onTouchEnd={e => {
                    if (this.touchY - e.nativeEvent.pageY > 20)
                      console.log('Swiped up')
                  }}>
                  <View style={styles.msgBoxRed} >
                    <Text style={{ color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 20 }}>{u.company.name}</Text>
                    <Text numberOfLines={showFullText ? 5 : 1} style={{ color: '#111111', fontFamily: 'Nunito-Regular', fontSize: 15, marginVertical: 7 }}>{u.offer}</Text>
                  </View>
                </TouchableOpacity>
                // </PanGestureHandler>

              )
            }
          }) : null
      }
      {
        services.map(i => i.categories.map(j => {
          return (
            <View key={i.id}>
              <TouchableOpacity style={styles.card_category_services} onPress={() => navigation.navigate("BookFeautures", { pp, i, j, services })}>
                <Text style={styles.name}>{j.name}</Text>
                <Image style={{ width: 20, height: 20, }} source={require('../../../../Assets/images/ic/ic_arrow.png')} />
                
              </TouchableOpacity>
            </View>
          )
        }))
      }
    </View>
  )
}
