import React, { useState, useEffect } from 'react'
import { View, ScrollView, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../../styles/Styles'
import { getAccessToken } from '../../../Storage/TokenStorage'
import { instance } from '../../../Api/ApiManager'
import Repetear from '../../../MobX/ProfileMobxRener'
import { HomeOrders } from './HomeOrders'
import { observer } from 'mobx-react-lite'

export const CompanyHome = observer(({ navigation }) => {
  const [myOffers, setMyOffers] = useState(null)
  const [company, setCompany] = useState('')


  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  useEffect(() => {
    readItemFromStorage()
    instance.get('/private/companies/user', config).then((res) => {
      setCompany(res.data)
      getOffers()
    }).catch(err => console.log(err))

  }, [token, Repetear.bool])

  const getOffers = () => {
    instance.get(`/private/offers`, config).then((res) => {
      setMyOffers(res.data)
    }).catch(err => console.log(err))
  }

  const deleteOffer = (id) => {
    instance.delete(`/private/offers/${id}`, config).then((res) => {
      getOffers()
    }).catch(err => console.log(err))
}
  return (
    <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
      <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>
        <View style={{ width: '100%', marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity style={styles.divspecial} onPress={() => navigation.navigate('CreateSpecialOffers')}>
            <Text style={{ alignItems: 'center', top: '45%', marginBottom: 20, color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>Create Special Offers</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ alignItems: 'center', marginTop: 50, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Lobster-Regular', fontSize: 25 }}>Offres of our company</Text>
          {
            myOffers ?
              Array.isArray(myOffers)
                ? myOffers.map((u, index) => {
                  if (u.company.id === company.id) {
                    return (
                      <View style={{ width: '85%' }} key={index}>
                        <View style={styles.msgBox} >
                          <Text style={{ color: '#111111', textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 15, marginVertical: 7, fontWeight: '400' }}>{u.offer}</Text>
                          <TouchableOpacity style={styles.btn_Red} onPress={()=>deleteOffer(u.id)}>
                            <Text style={{ fontFamily: 'Nunito-Black', color: '#414C60', textAlign: 'center' }}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  }
                })
                : null
              : <TouchableOpacity style={{ width: '85%' }}>
                <View style={styles.msgBox} >
                  <Text style={{ color: '#111111', fontFamily: 'Nunito-Regular', fontSize: 15, marginVertical: 7, textAlign: 'center' }}>You don't have any offer</Text>
                </View>
              </TouchableOpacity>
          }

          <HomeOrders props={company}/>

        </View>


      </ImageBackground>
    </ScrollView>
  )
})
