import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { styles } from '../../../styles/Styles'
import Modal from "react-native-modal";
import { instance } from "../../../Api/ApiManager";
import { getAccessToken, getRefreshToken } from '../../../Storage/TokenStorage';
import { Search } from '../Home/Search';
import { CompanyImages } from './CompanyImages';
import { CompanyListServices } from './CompanyListServices';



export const CompanyList = ({ navigation }) => {



  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => {
    const item = await getAccessToken();
    setToken(item)
  };

  const [data, setData] = useState([]);



  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  useEffect(() => {
    readItemFromStorage()
    instance.get('private/companies/all', config)
      .then(function (response) {
        setData(response.data)
        getServices()
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [token])

  const getServices = () => {
    instance.get(`/private/services/all`, config).then((response) => {
        
        setServices(response.data)
    }).catch((err) => console.error(err))
}

  return (
    <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
      <ImageBackground source={require('../../../Assets/images/profileback.png')} style={styles.imageprofile}>
        <Search />
        {/* <View style={styles.controw}>
          <TouchableOpacity style={styles.buttoncompany}>
            <Text style={{ color: '#212427', fontFamily: 'Nunito-Black', fontSize: 15, top: '25%', fontWeight: '600' }} onPress={()=>navigation.navigate('OpenMap')}>Open Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttoncompany} onPress={toggleModal} >
            <Text style={{ color: '#212427', fontFamily: 'Nunito-Black', fontSize: 15, top: '25%', fontWeight: '600' }}>Filter</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                  <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                </TouchableOpacity>
                <View style={{ zIndex: 100, alignItems: 'center', top: '40%', position: 'absolute', width: '100%' }}>
                  <Text style={{ color: '#212427', fontFamily: 'Nunito-Black', fontSize: 15, top: '25%', fontWeight: '600' }}>Price</Text>
                  <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-around', width: '75%' }}>
                  </View>
                </View>

                <View style={{ zIndex: 100, alignItems: 'center', top: '55%', position: 'absolute', width: '100%' }}>
                  <Text style={{ color: '#212427', fontFamily: 'Nunito-Black', fontSize: 15, top: '25%', fontWeight: '600' }}>Categories</Text>
                  <View style={{ marginTop: 50, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '85%' }}>
                    {
                      categories.map((u) => {
                        if (u.id <= 4) {
                          return (
                            <View key={u.id} >
                              <TouchableOpacity style={styles.card_category_row_filter}>
                                <Text style={styles.name}>{u.name}</Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }

                      }
                      )
                    }
                  </View>
                  <Text style={{ color: '#414C60', alignSelf: 'flex-end', marginRight: 30, marginTop: 10 }}>View all</Text>

                </View>



                <View style={{ zIndex: 100, alignItems: 'center', top: '90%', position: 'absolute', width: '100%' }}>
                  <TouchableOpacity style={styles.profile_info_button}>
                    <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Apply</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Image source={require('../../../Assets/images/filter.png')} style={{ alignItems: 'center' }} />
                </View>
              </View>
            </Modal>
          </View>
        </View> */}
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