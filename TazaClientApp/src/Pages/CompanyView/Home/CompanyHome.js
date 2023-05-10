import React, { useState, useEffect } from 'react'
import { View, ScrollView, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../../styles/Styles'
import { getAccessToken } from '../../../Storage/TokenStorage'
import { instance } from '../../../Api/ApiManager'
import Repetear from '../../../MobX/ProfileMobxRener'
import { observer } from 'mobx-react-lite'
import { t } from 'i18next';
import { AvatarImage } from '../../AfterLogin/CompanyList/CompanyDetails/AvatarImage'


export const CompanyHome = observer(({ navigation }) => {
  const [myOffers, setMyOffers] = useState(null)
  const [company, setCompany] = useState('')
  const [orderData, setOrderData] = useState()

  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  useEffect(() => {
    readItemFromStorage()
    instance.get('/private/companies/user', config).then((res) => {
      setCompany(res.data)
      getOrders(res.data.id)
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

  const getOrders = (companyId) => {
    instance.get(`/private/orders/company/${companyId}`, config).then(res => {
      setOrderData(res.data)
    }).catch(err => console.log(err))
  }

  return (
    <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
      <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>
        <View style={{ width: '100%', marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity style={styles.divspecial} onPress={() => navigation.navigate('CreateSpecialOffers')}>
            <Text style={{ alignItems: 'center', color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Create Special Offers')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ alignItems: 'center', marginTop: 50, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Offers of your company')}</Text>
          {
            myOffers ?
              Array.isArray(myOffers)
                ? myOffers.map((u, index) => {
                  if (u.company.id === company.id) {
                    return (
                      <View style={{ width: '85%' }} key={index}>
                        <View style={styles.msgBox} >
                          <Text style={{ color: '#111111', textAlign: 'center', fontFamily: 'Nunito-Regular', fontSize: 15, marginVertical: 7, fontWeight: '400' }}>{u.offer}</Text>
                          <TouchableOpacity style={styles.btn_Red} onPress={() => deleteOffer(u.id)}>
                            <Text style={{ fontFamily: 'Nunito-Black', color: '#414C60', textAlign: 'center' }}>{t('Delete')}</Text>
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

          {/* <HomeOrders props={company}/> */}

          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={{ alignItems: 'center', marginTop: 50, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Last Orders')}</Text>
            {
              Array.isArray(orderData) && orderData.map((item) => {
                const date = new Date(item.date);
                const dateString = date.toLocaleDateString();
                const timeString = date.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
                if (item.status.id === 1 || item.status.id === 2) {
                  return (
                    <TouchableOpacity
                      // style={{ backgroundColor: '#D9D9D9', borderRadius: 20, flexDirection: 'row', padding: 20, alignItems: 'center', marginBottom: 10 }}
                      style={
                        item.status.id === 1
                          ? { ...styles.lastOrderYellow }
                          : { ...styles.lastOrderBlue }
                      }
                      onPress={() => navigation.navigate("HomeOrders", { item })}>
                      <AvatarImage props={item.user.photo}></AvatarImage>
                      <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontFamily: 'Nunito-Bold', color: '#414C60', fontSize: 17 }}>{item.user.fullName}</Text>
                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>{item.companyService.categories[0].name}</Text>
                        <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontSize: 15 }}>Date and time - {dateString}, {timeString}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              })
            }



          </View>
          <View style={{width: '85%', marginVertical: 10}}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AllOrderList')}>
              <Text style={{ color: '#414C60', fontFamily: 'Nunito-SemiBold', fontSize: 15, top: '25%', }}>{t('All Orders')}</Text>
            </TouchableOpacity>
          </View>

        </View>


      </ImageBackground>
    </ScrollView>
  )
})
