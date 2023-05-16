import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import { styles } from '../../../styles/Styles'
import { instance } from '../../../Api/ApiManager';
import { getAccessToken } from '../../../Storage/TokenStorage';
import { t } from 'i18next';
import { getLanguage } from '../../../Storage/LanguageStorage';



export const AllCategories = ({ navigation }) => {
  const [token, setToken] = useState();
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item); console.log('item - ', item)};

  const [language, setStorageLanguage] = useState();
  const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };

  const [data, setData] = useState([]);
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  useEffect(() => {
    readItemFromStorage()
    readLanguage()
    console.log('company == ', token)
    instance.get('private/categories/all', config)
      .then(function (response) {
        setData(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token])

  const backNav = () => {
    navigation.replace("BottomBar")
  }


  return (
    <ScrollView style={styles.containerwellcome}>
      <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.back}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={backNav}>
            <Image source={require('../../../Assets/images/ic/ri_menu-4-fill.png')} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontFamily: 'Nunito-Regular', fontSize: 20, left: '50%', width: '100%' }}>{t('All Categories')}</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          {
            data.map((u) => {
              return (
                <View key={u.id}>
                  <TouchableOpacity style={styles.card_category_row} onPress={() => navigation.navigate('FindByCategory', u)}>
                    <Image style={styles.image_card} resizeMode="cover" source={u.img} />
                    { language==='ru' ? <Text style={styles.name}>{u.nameRu}</Text> : null }
                    { language==='kz' ? <Text style={styles.name}>{u.nameKz}</Text> : null }
                    { language==='en' ? <Text style={styles.name}>{u.name}</Text> : null }
                  </TouchableOpacity>
                </View>
              );
            })
          }
        </View>
      </ImageBackground>
    </ScrollView>
  )
}