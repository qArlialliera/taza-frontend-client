import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import { styles } from '../../../styles/Styles'
import instanceToken from '../../../Api/ApiManager';
import { t } from 'i18next';
import { getLanguage } from '../../../Storage/LanguageStorage';



export const AllCategories = ({ navigation }) => {

  const [language, setStorageLanguage] = useState();
  const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };

  const [data, setData] = useState([]);
  useEffect(() => {

    readLanguage()
    instanceToken.get('/categories/all')
      .then(function (response) {
        setData(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const backNav = () => {
    navigation.replace("BottomBar")
  }


  return (
    <ScrollView style={styles.contscrollView} contentContainerStyle={{ paddingRight: 0, minHeight: '100%' }}>
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