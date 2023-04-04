import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { styles } from '../../../styles/Styles'
import Modal from "react-native-modal";
import { instance } from "../../../Api/ApiManager";
import { getRefreshToken } from '../../../Storage/TokenStorage';
// import { TextInput } from 'react-native-paper';


export const CompanyList = ({ navigation }) => {
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => {
    const item = await getRefreshToken();
    setToken(item)
  };

  const [searchText, setSearchText] = useState("");
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
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
      })
      .catch(function (error) {
        console.log(error);
      });

    instance.get('private/categories/all', config)
      .then(function (response) {
        setCategories(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token])


  return (
    <ScrollView style={styles.containerScroll}>
      <ImageBackground source={require('../../../Assets/images/profileback.png')} style={{width: '100%',backgroundColor: '#8E9AAF'}}>
        <View >
          <SearchBar
            height={50}
            fontSize={18}
            fontColor="#fff"
            iconColor="#fff"
            shadowColor="#282828"
            cancelIconColor="#fdfdfd"
            spinnerVisibility={spinnerVisibility}
            placeholder="Search..."
            fontFamily="Nunito-Regular"
            style={styles.searchbar}
            // shadowStyle={styles.searchBarShadowStyle}
            onChangeText={(text) => SearchText(text)}
          />
        </View>
        <View style={styles.controw}>
          <TouchableOpacity style={styles.buttoncompany}>
            <Text style={{color: '#212427',fontFamily: 'Nunito-Black',fontSize: 15,top: '25%',fontWeight: '600'}}>Open Map</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttoncompany} onPress={toggleModal} >
            <Text style={{color: '#212427',fontFamily: 'Nunito-Black',fontSize: 15,top: '25%',fontWeight: '600'}}>Filter</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                  <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                </TouchableOpacity>
                <View style={{ zIndex: 100, alignItems: 'center', top: '40%', position: 'absolute', width: '100%' }}>
                  <Text style={{color: '#212427',fontFamily: 'Nunito-Black',fontSize: 15,top: '25%',fontWeight: '600'}}>Price</Text>
                  <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-around', width: '75%' }}>
                    {/* <TextInput keyboardType="numeric" placeholder='from' style={{ backgroundColor: '#fff', width: 130, }} />
                    <TextInput keyboardType="numeric" placeholder='to' style={{ backgroundColor: '#fff', width: 130 }} /> */}
                  </View>
                </View>

                <View style={{ zIndex: 100, alignItems: 'center', top: '55%', position: 'absolute', width: '100%' }}>
                  <Text style={{color: '#212427',fontFamily: 'Nunito-Black',fontSize: 15,top: '25%',fontWeight: '600'}}>Categories</Text>
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
                    <Text style={{color: '#D9D9D9',fontFamily: 'Nunito-Black',fontSize: 15,}}>Apply</Text>
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
          <View>

            {
              data.map((u) => {
                return (
                  <View key={u.id} >
                    <View style={styles.cont_company}>
                      <TouchableOpacity style={styles.box_company} onPress={() => navigation.navigate('CompanyDetails', u)}>
                        <View>
                          <Image style={styles.image_company} source={require('../../../Assets/images/newimg.png')} />
                        </View>
                        <View>
                          <Text style={{marginLeft: 30,alignItems: 'flex-start',marginVertical: 20,color: '#414C60',fontFamily: 'Lobster-Regular',fontSize: 25}}>{u.name}</Text>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 20, pointerEvents: 'box-none' }}>

                            {
                              u.categories.map((c) => {

                                <View key={c.id} style={{ backgroundColor: '#8E9AAF', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10 }}>
                                  <Text style={{ fontFamily: 'Nunito-SemiBold', color: '#fff' }}>{c.name}</Text>


                                </View>
                              })
                            }


                          </View>
                        </View>

                      </TouchableOpacity>

                    </View>

                  </View>
                );
              })
            }

          </View>

        </View>



      </ImageBackground>
    </ScrollView>
  )
}