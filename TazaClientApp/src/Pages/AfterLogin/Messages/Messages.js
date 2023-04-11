import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, Image } from 'react-native'
import { styles } from '../../../styles/Styles'


export const Messages = () => {
  const DATA = [
    { id: 1, name: 'Company X', img: require('../../../Assets/images/newimg.png'), last: 'Hello, I wanted to...' },
    { id: 2, name: 'CompanyPOST', img: require('../../../Assets/images/newimg.png'), last: 'Hello, I your booking...' },
    { id: 3, name: 'BestPrice', img: require('../../../Assets/images/newimg.png'), last: 'Hello, I wanted to...' }
  ]
  return (
    <View style={styles.containerwellcome}>
    <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.back}>
      <SafeAreaView style={styles.container_messages}>
        
        <FlatList
          data={DATA}
          renderItem={
            ({ item }) => (
              <View key={item.id} >
                <TouchableOpacity style={{ width: '100%', flexDirection: 'row', height: 90, alignItems: 'center', borderBottomWidth: 1, borderColor: '#262D3A' }}
                  onPress={() => navigation.navigate("Massages_Chat", item)}>
                  <Image source={item.img} style={styles.image_card_m} resizeMode="cover" />
                  <View style={{ flexDirection: 'column', marginHorizontal: 20, marginVertical: 20, width: '70%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'white', fontFamily: 'Nunito-Black', fontSize: 20 }}>{item.name}</Text>
                      <Text style={{ color: '#A8A8A8', fontFamily: 'Nunito-Regular', fontSize: 15 }}>23:34</Text>
                    </View>
                    <Text style={{ color: '#A8A8A8', fontFamily: 'Nunito-Regular', fontSize: 15 }}>{item.last}</Text>
                  </View>
                </TouchableOpacity>

              </View>
            )
          }
        />
        
      </SafeAreaView>

    </ImageBackground>
  </View>
  )
}
