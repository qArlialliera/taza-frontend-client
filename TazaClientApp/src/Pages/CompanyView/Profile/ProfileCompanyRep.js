import React, { useState, useEffect } from 'react'
import { View, ScrollView, ImageBackground, TouchableOpacity, Text, Image } from 'react-native'
import { styles } from '../../../styles/Styles'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { ProfileCompRep_Services } from './ProfileCompRep_Services';
import { ProfileCompRep_Reviews } from './ProfileCompRep_Reviews';
import { ProfileCompRep_Information } from './Information/ProfileCompRep_Information';
import StarRating from 'react-native-star-rating-widget';
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken } from '../../../Storage/TokenStorage';
import { removeRole } from '../../../Storage/RoleStorage'
import { instance } from '../../../Api/ApiManagerPublic';
import Repetear from '../../../MobX/ProfileMobxRener'
import { observer } from 'mobx-react-lite';

import { t } from 'i18next';
import instanceToken from '../../../Api/ApiManager';


export const ProfileCompanyRep = observer(({ navigation }) => {

  const [isHaveCompany, setIsHaveCompany] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [data, setData] = useState('');
  const [imageData, setImageData] = useState(null);

  //token
  const removeRefreshFromStorage = async () => { const item = await removeRefreshToken() };
  const removeAccessFromStorage = async () => { const item = await removeAccessToken() };
  const removeRoleFromtorage = async () => { const item = await removeRole() };


  useEffect(() => {
    instanceToken.get('/companies/exist-for-user').then(res => {
      setIsHaveCompany(res.data)
    }).catch(err => console.log(err))

    instanceToken.get('/companies/user').then((res) => {
      setData(res.data)
      getCurrentRating(res.data.id)
      getImage(res.data.photo)
    }).catch(err => console.log(err))
  }, [Repetear.bool])

  const getImage = (uuid) => {
    console.log(uuid)
    instance.get(`/file/photo/get/${uuid}`, { responseType: 'blob' }).then((response) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(response.data);

    }).catch(err => console.error(err))
  }

  const getCurrentRating = (id) => {
    instanceToken.get(`/review/rating/${id}`).then((res) => {
      setCurrentRating(res.data)

    }).catch(err => console.log(err))
  }
  const changePage = (index) => {
    setSelectedIndex(index);
  }

  const LogOut = () => {
    removeRefreshFromStorage()
    removeAccessFromStorage()
    removeRoleFromtorage()
    navigation.navigate("Welcome")
  }

  const servicesLabel = t('Services');
  const commentsLabel = t('Comments');
  const contactsLabel = t('Contacts');

  return (
    <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }} >
      <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.back}>
        {
          isHaveCompany ?
            <View>
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                {
                  imageData
                    ? <Image source={{ uri: imageData }} style={styles.circleimg} />
                    : <Image source={require('../../../Assets/images/newimg.png')} style={styles.circleimg} />
                }
                <Text style={styles.primary}>{data.name}</Text>
                <StarRating
                  rating={currentRating}
                  color='#EFD3D7'
                  enableSwiping={false}
                  onChange={() => console.log()}
                />
              </View>
              <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>

                <SegmentedControlTab
                  values={[servicesLabel, commentsLabel, contactsLabel]}
                  // values={[{ t('Services') }, { t('Comments') }, { t('Contacts') }]}
                  // values={["Services", "Comments", "Contacts"]}
                  selectedIndex={selectedIndex}
                  onTabPress={changePage}
                  borderRadius={17}
                  tabTextStyle={styles.tabtextstyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                  tabStyle={styles.tabStyle}
                />

                <View style={{ marginTop: 30 }}>
                  {selectedIndex === 0 && (
                    <ProfileCompRep_Services props={data.id} />
                  )}
                  {selectedIndex === 1 && (
                    <ProfileCompRep_Reviews props={data}/>
                  )}
                  {selectedIndex === 2 && (
                    <ProfileCompRep_Information />
                  )}

                </View>

              </View>
            </View>
            :
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 25, textAlign: 'center', marginVertical: 40 }}> You don't have any companies. Please add</Text>
              <TouchableOpacity style={styles.company_contsct_btn} onPress={() => navigation.navigate('CreateCompany')} >
                <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Create company</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.company_contsct_btn_secondary} onPress={LogOut}>
                <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15 }}>Log Out</Text>
              </TouchableOpacity>
            </View>
        }

      </ImageBackground>
    </ScrollView>
  )
})
