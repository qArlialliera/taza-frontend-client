import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from '../../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { instance } from '../../../../Api/ApiManager';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { Services_Mapping } from './Services_Mapping';

export const CompanyDetails_Services = (props) => {
  const pp = props.props;
  const navigation = useNavigation();
  //token
  const [token, setToken] = useState(readItemFromStorage);
  const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
  const config = { headers: { 'Authorization': 'Bearer ' + token } }
  //useStates
  const [services, setServices] = useState([]);

  useEffect(() => {
    readItemFromStorage()
    console.log(pp)
    instance.get(`/private/services/company/${pp.id}`, config).then((response) => {
      setServices(response.data)
    }).catch((err) => {
      console.error(err)
    })

  }, [token])

  // const goToBookPage = () =>{

  // }

  return (
    <View>
      {
        services.map(i => i.categories.map(j => {
          return (
            <View key={i.id}>
              <TouchableOpacity style={styles.card_category_services} onPress={()=> navigation.navigate("BookFeautures", {pp, i, j, services})}>
                <Text style={styles.name}>{j.name}</Text>
                <Image style={{ width: 20, height: 20, }} source={require('../../../../Assets/images/ic/ic_arrow.png')} />
              </TouchableOpacity>
            </View>
          )
        }))
      }
    </View>
  )
}
