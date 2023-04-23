import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getAccessToken } from '../../../Storage/TokenStorage';
import { instance } from '../../../Api/ApiManager';
import { styles } from '../../../styles/Styles'

export const CompanyListServices = (props) => {
  console.log(props.props)
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }

  const [servicess, setServicess] = useState([])
  useEffect(() => {
    readItemFromStorage()
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
                  <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', }}>{j.name}</Text>
              </View>
            )
          }))
        }
    </View>
  )
}
