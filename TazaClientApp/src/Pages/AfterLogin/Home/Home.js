import React, { useState, useEffect } from 'react'
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../../styles/Styles'
import SearchBar from "react-native-dynamic-search-bar";


const DATA = [
    { id: 1, name: 'General Cleaning', img: require('../../../Assets/images/icon_general.png') },
    { id: 2, name: 'Wet Cleaning', img: require('../../../Assets/images/icon_wet.png') },
    { id: 4, name: 'Cleaning after repair', img: require('../../../Assets/images/icon_repair.png') },
    { id: 3, name: 'Office Cleaning', img: require('../../../Assets/images/icon_office.png') },
]




export const Home = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const ReplaceWithAll = () => {
        navigation.navigate("all_categories")
    }
    const SearchText = (e) => {
        setSpinnerVisibility(true);
        setSearchText(e);
        console.log(searchText)
    }

    useEffect(() => {
      if(!searchText) setSpinnerVisibility(false)
        
      console.log('searchText', searchText)
    }, [searchText])
    

    return (
        <ScrollView style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>
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
                        onClearPress={() => setSearchText("")}
                    />
                </View>
                <TouchableOpacity style={styles.divspecial}>
                    <Text style={{ alignItems: 'center', top: '45%', marginBottom: 20, color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>Special Offers</Text>
                </TouchableOpacity>
                <Text style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Nunito-SemiBold', fontSize: 20 }}>Select by category</Text>
                <View>
                    <View style={styles.grid}>
                        {
                            DATA.map((u) => {
                                return (
                                    <View key={u.id} >
                                        <TouchableOpacity style={styles.card_category} onPress={() => navigation.navigate('FindByCategory', u)}>
                                            <Image style={styles.image_card} resizeMode="cover" source={u.img} />
                                            <Text style={styles.name}>{u.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }

                    </View>
                    <TouchableOpacity style={styles.button} onPress={ReplaceWithAll}>
                        <Text style={{color: '#414C60',fontFamily: 'Nunito-SemiBold',fontSize: 15,top: '25%',}}>All Categories</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </ScrollView>
    )
}