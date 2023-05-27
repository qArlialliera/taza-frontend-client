import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import { styles } from '../../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import instanceToken from '../../../../Api/ApiManager';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


export const CompanyDetails_Services = (props) => {
  const pp = props.props;
  const navigation = useNavigation();
  //useStates
  const [services, setServices] = useState([]);
  const [offer, setOffer] = useState()
  const [showFullText, setShowFullText] = useState(false);
  const [swiped, setSwiped] = useState(false);


  useEffect(() => {
    instanceToken.get(`/services/company/${pp.id}`).then((response) => {
      setServices(response.data)
    }).catch((err) => {
      console.error(err)
    })


    instanceToken.get('/offers').then((res) => {
      console.log(res.data)
      setOffer(res.data)
    }).catch(err => console.log(err))

    console.log(swiped)
  }, [swiped])

  function onSwipe(gestureName) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        slideleft()
        setSwiped(false)
        break;
      case SWIPE_RIGHT:
        slideright()
        setSwiped(true)
        break;
    }
  }


  const slideX = useRef(new Animated.Value(0)).current;


  const slideright = () => {
    Animated.timing(slideX, {
      toValue: 100,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }
  const slideleft = () => {
    Animated.timing(slideX, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View>

      {
        Array.isArray(offer)
          && swiped === false
          ?
          offer.map((u, index) => {
            if (pp.id === u.company.id) {
              return (
                <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state)}>
                  <Animated.View style={{ transform: [{ translateX: slideX }] }} >
                    <TouchableOpacity key={index} onPress={() => setShowFullText(!showFullText)}>
                      <View style={styles.msgBoxRed} >
                        <Text style={{ color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 20 }}>{u.company.name}</Text>
                        <Text numberOfLines={showFullText ? 5 : 1} style={{ color: '#111111', fontFamily: 'Nunito-Regular', fontSize: 15, marginVertical: 7 }}>{u.offer}</Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                </GestureRecognizer>


              )
            }
          }) : null
      }

      {
        services.map(i => i.categories.map(j => {
          return (
            <View key={i.id}>
              {
                !i.additionalService ?
                  <TouchableOpacity style={styles.card_category_services} onPress={() => navigation.navigate("BookFeautures", { pp, i, j, services })}>
                    <Text style={styles.name}>{j.name}</Text>
                    <Image style={{ width: 20, height: 20, }} source={require('../../../../Assets/images/ic/ic_arrow.png')} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.card_category_services_disabled}>
                    <Text style={styles.name}>{j.name}</Text>
                    <Image style={{ width: 20, height: 20, }} source={require('../../../../Assets/images/ic/ic_arrow.png')} />
                  </TouchableOpacity>
              }
            </View>
          )
        }))
      }
    </View>
  )
}
