import React, { useState } from 'react'
import { View, ImageBackground, Text, Image } from 'react-native';
import { styles } from '../../../../styles/Styles';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { CompanyDetails_Services } from './CompanyDetails_Services';
import { CompanyDetails_Contacts } from './CompanyDetails_Contacts';
import { CompanyDetails_Comments } from './CompanyDetails_Comments';

export const CompanyDetails = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);


  const pp = JSON.parse(JSON.stringify(props)).route.params
  // console.info('categories - ', pp.categories)

  const changePage = (index) => {
    console.log(pp)
    setSelectedIndex(index);
    console.log(index)
  }


  return (
    <View style={styles.containerwellcome}>
      <ImageBackground source={require('../../../../Assets/images/homeBack.png')} style={styles.back}>

        {/* Standart info */}
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Image source={require('../../../../Assets/images/newimg.png')} style={styles.circleimg} />
          <Text style={styles.primary}>{pp.name}</Text>
          <Image source={require('../../../../Assets/images/raiting.png')} />
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

          <View style={{marginTop: 30}}>
          {selectedIndex === 0 && (
            <CompanyDetails_Services props={pp}/>
          )}
          {selectedIndex === 1 && (
            <CompanyDetails_Comments />
          )}
          {selectedIndex === 2 && (
            <CompanyDetails_Contacts props={pp}/>
          )}
          {/* {selectedIndex === 2 && (
            <CompanyDetails_Contacts props={pp}/>
          )} */}

          </View>

        </View>
      </ImageBackground>
    </View>
  )
}