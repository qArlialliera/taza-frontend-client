import React, { useState, useEffect } from 'react'
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../../styles/Styles'
import SearchBar from 'react-native-dynamic-search-bar';
import { instance } from '../../../Api/ApiManager';
import { getAccessToken } from '../../../Storage/TokenStorage';
import FuzzySearch from 'fuzzy-search';
import { useNavigation } from '@react-navigation/native';

export const Search = () => {
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [isSearchName, setIsSearchName] = useState(false);
    const [data, setData] = useState("");
    const [services, setServices] = useState("");

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const navigation = useNavigation();


    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    const SearchText = (e) => {
        setSpinnerVisibility(true);
        setSearchQuery(e)
        setIsSearchName(true)

    }

    // const searchCategory = (query) => {
    //     const searcher = new FuzzySearch(data, ['categories.name']);
    //     const results = searcher.search(query);
    //     setSearchResults(results);
    // };


    const searchByName = (query) => {
        const searcher = new FuzzySearch(data, ['name']);
        const results = searcher.search(query);
        setSearchResults(results);
    };

    useEffect(() => {
        readItemFromStorage()
        if (!searchQuery) {
            setSpinnerVisibility(false)
            setIsSearchName(false)
        }

        console.log('searchResults', searchResults)

        instance.get('/private/companies/all', config).then((res) => {
            setData(res.data)
            getServices()
            searchByName(searchQuery);
        }).catch(err => console.error('err', err))

    }, [searchQuery, token])

    const getServices = () => {
        instance.get(`/private/services/all`, config).then((response) => {
            
            setServices(response.data)
        }).catch((err) => console.error(err))
    }


    return (
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
                onChangeText={(text) => SearchText(text)}
                onClearPress={() => setSearchQuery("")}
            />

            {
                isSearchName ?
                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                {
                  Array.isArray(searchResults)
                    ?
                    searchResults.map(u => {
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
                    : null
            }

        </View>
    )
}
