import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/Styles'
import instanceToken from "../../../Api/ApiManager";
import { Search } from '../Home/Search';
import { CompanyImages } from './CompanyImages';
import { CompanyListServices } from './CompanyListServices';



export const CompanyList = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    instanceToken.get('/companies/all')
      .then(function (response) {
        setData(response.data)
        getServices()
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])


  return (
    <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
      <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
        <Search />
        <View>
          <View style={{ marginHorizontal: 20}}>
            {
              Array.isArray(data)
                ?
                data.map(u => {
                  return (
                    <View key={u.id}>
                      <View style={styles.cont_company}>
                        <TouchableOpacity style={styles.box_company} onPress={() => navigation.navigate('CompanyDetails', u)}>
                            <CompanyImages props={u.photo} />
                          <View style={{ marginLeft: 30, alignItems: 'flex-start' }}>
                            <Text style={{ color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{u.name}</Text>
                            <CompanyListServices props={u.id}/>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }) : null
            }
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}