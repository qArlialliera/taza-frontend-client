import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { styles } from '../../../styles/Styles'
import Modal from "react-native-modal";
import { instance } from "../../../Api/ApiManager";
import { getAccessToken, getRefreshToken } from '../../../Storage/TokenStorage';
import { Search } from '../Home/Search';
// import { TextInput } from 'react-native-paper';


export const CompanyList = ({ navigation }) => {
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => {
    const item = await getAccessToken();
    setToken(item)
  };

  const [searchText, setSearchText] = useState("");
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState("");

  const SearchText = (e) => {
    setSearchText(e);
    console.log(searchText)
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [lowerPrice, setLowerPrice] = useState();
  const [higherPrice, setHigherPrice] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  useEffect(() => {
    readItemFromStorage()
    console.log('company == ', token)
    instance.get('private/companies/all', config)
      .then(function (response) {
        setData(response.data)
        getServices()
      })
      .catch(function (error) {
        console.log(error);
      });

    // instance.get('private/categories/all', config)
    //   .then(function (response) {
    //     setCategories(response.data)
    //     console.log(response.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
        <View style={styles.controw}>
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
        </View>
        <View>
          <View style={{ marginHorizontal: 20, marginTop: 30 }}>
            {
              Array.isArray(data)
                ?
                data.map(u => {
                  // getServices(u.id)
                  return (
                    <View key={u.id}>
                      <View style={styles.cont_company}>
                        <TouchableOpacity style={styles.box_company} onPress={() => navigation.navigate('CompanyDetails', u)}>
                          <View>
                            <Image style={styles.image_company} source={require('../../../Assets/images/newimg.png')} />
                          </View>
                          <View style={{ marginLeft: 30, alignItems: 'flex-start' }}>
                            <Text style={{ color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{u.name}</Text>
                            {

                              Array.isArray(services)
                                ?
                                services.map(i => i.categories.map(j => {
                                  // console.log(`slice - ${index} `)
                                  if (u.id === i.company[0].id) {
                                    return (
                                      <View key={j.id} style={{ backgroundColor: '#8E9AAF', borderRadius: 5, marginVertical: 4, padding: 5 }}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', }}>{j.name}</Text>
                                      </View>
                                    )

                                  }
                                })) : null
                            }
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