import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Text, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { styles } from '../../../../styles/Styles';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { CompanyDetails_Services } from './CompanyDetails_Services';
import { CompanyDetails_Contacts } from './CompanyDetails_Contacts';
import { CompanyDetails_Comments } from './CompanyDetails_Comments';
import { instance } from '../../../../Api/ApiManager';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Repetear from '../../../../MobX/ProfileMobxRener'


export const CompanyDetails = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);


  const pp = JSON.parse(JSON.stringify(props)).route.params

  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }


  const changePage = (index) => {
    console.log(pp)
    setSelectedIndex(index);
    console.log(index)
  }

  useEffect(() => {
    readItemFromStorage()
    instance.get(`/private/review/rating/${pp.id}`, config).then((res) => {
      setCurrentRating(res.data)
    }).catch(err => console.log(err))

  }, [token, Repetear.bool])

  return (
    // <ScrollView horizontal style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }} >
    <KeyboardAwareScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }} >
      <ImageBackground source={require('../../../../Assets/images/homeBack.png')} style={styles.back}>

        {/* Standart info */}
        {/* <KeyboardAvoidingView behavior="padding"> */}
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Image source={require('../../../../Assets/images/newimg.png')} style={styles.circleimg} />
          <Text style={styles.primary}>{pp.name}</Text>
          <StarRating
            rating={currentRating}
            color='#EFD3D7'
            enableSwiping={false}
            onChange={() => console.log()}
          />
        </View>
        <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>

          <SegmentedControlTab
            values={["Services", "Comments", "Contacts"]}
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
              <CompanyDetails_Services props={pp} />
            )}
            {selectedIndex === 1 && (
              <CompanyDetails_Comments props={pp} />
            )}
            {selectedIndex === 2 && (
              <CompanyDetails_Contacts props={pp} />
            )}

          </View>

        </View>
        {/* </KeyboardAvoidingView> */}

      </ImageBackground>
    </KeyboardAwareScrollView>

  )
}