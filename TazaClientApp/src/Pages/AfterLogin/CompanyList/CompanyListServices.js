import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getAccessToken } from '../../../Storage/TokenStorage';
import { instance } from '../../../Api/ApiManager';
import { styles } from '../../../styles/Styles'
import { getLanguage } from '../../../Storage/LanguageStorage';

export const CompanyListServices = (props) => {
  console.log(props.props)
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };

  const [language, setStorageLanguage] = useState();
  const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };

  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const [servicess, setServicess] = useState([])
  useEffect(() => {
    readItemFromStorage()
    readLanguage()
    instance.get(`/private/services/company/${props.props}`, config).then((res) => {
      setServicess(res.data)
    }).catch(error=>console.log(error))
  }, [token])

  return (
    <View>

        {
          servicess.slice(0, 2).map(i => i.categories.map((j, index) => {
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
