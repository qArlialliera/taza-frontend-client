import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getAccessToken } from '../../../Storage/TokenStorage';
import instanceToken from '../../../Api/ApiManager';
import { styles } from '../../../styles/Styles'
import { getLanguage } from '../../../Storage/LanguageStorage';

export const CompanyListServices = (props) => {
  console.log(props.props) 

  const [language, setStorageLanguage] = useState();
  const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };


  const [servicess, setServicess] = useState([])
  useEffect(() => {
    readLanguage()
    instanceToken.get(`/services/company/${props.props}`).then((res) => {
      setServicess(res.data)
    }).catch(error=>console.log(error))
  }, [])

  return (
    <View>

        {
          servicess.slice(0, 2).map(i => i.categories.map((j) => {
            return (
              <View key={i.id} style={{ backgroundColor: '#8E9AAF', borderRadius: 5, marginVertical: 4, padding: 5 }}>
                { language === 'ru' ? <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', }}>{j.nameRu}</Text> : null }
                { language === 'kz' ? <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', }}>{j.nameKz}</Text> : null }
                { language === 'en' ? <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', }}>{j.name}</Text> : null }
              </View>
            )
          }))
        }
    </View>
  )
}
