import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { styles } from '../../../styles/Styles'
import { useNavigation } from '@react-navigation/native'
import { getAccessToken, getRefreshToken } from '../../../Storage/TokenStorage'
import instanceToken, { instance } from '../../../Api/ApiManager'

import Modal from "react-native-modal";
import Repetear from '../../../MobX/ProfileMobxRener'
import { getLanguage } from '../../../Storage/LanguageStorage'
import { t } from 'i18next';


export const ProfileCompRep_Services = (props) => {
  const pp = props.props
  const navigation = useNavigation()
  const [isServices, setIsServices] = useState(false)
  const [services, setServices] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditActive, setEditActive] = useState(false);
  const [language, setStorageLanguage] = useState();
  const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };

  useEffect(() => {
    readLanguage()
    instanceToken.get(`/services/company/${pp}`).then((res) => {
      setIsServices(true)
      setServices(res.data)
    }).catch(err => console.error(err))
  }, [Repetear.bool])


  const ModalEdit = () => {
    return (
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => setModalVisible(false)}>
              <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
            </TouchableOpacity>
            <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
              <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>{t('What do you want?')}</Text>
                <View style={{ top: '50%' }}>
                  <TouchableOpacity style={styles.profile_info_button} onPress={() => navigation.navigate('CreateServices')}>
                    <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>{t('Add new service')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profile_info_button} onPress={EditQctive}>
                    <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>{t('Edit Service')}</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>

        </Modal>
      </View>
    );
  }



  const EditQctive = () => {
    setEditActive(!isEditActive)
    setModalVisible(false)
  }

  const deleteService = (id) => {
    console.log(id)
  }
  return (
    <View>
      <ModalEdit />
      {
        services
          ? services.map(i => i.categories.map(j => {
            return (
              <View key={i.id}>
                <TouchableOpacity style={styles.card_category_services}>
                  {/* <Text style={styles.name}>{j.name}</Text> */}
                  { language === 'ru' ? <Text style={styles.name}>{j.nameRu}</Text> : null}
                  { language === 'kz' ? <Text style={styles.name}>{j.nameKz}</Text> : null}
                  { language === 'en' ? <Text style={styles.name}>{j.name}</Text> : null}
                  {
                    isEditActive
                      ?
                      <TouchableOpacity style={styles.redDeleteBtn} onPress={()=>deleteService(j.id)}>
                        <Image source={require('../../../Assets/images/ic/ic_outline-delete.png')} />
                      </TouchableOpacity>
                      : <Image style={{ width: 20, height: 20, }} source={require('../../../Assets/images/ic/ic_arrow.png')} />
                  }


                </TouchableOpacity>
              </View>
            )
          }))
          : null
      }

      {
        isServices ?
          <TouchableOpacity style={styles.profile_info_button} onPress={()=>setModalVisible(true)}>
            <Text style={sStyle.secondary_button}>{t('Edit services')}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.profile_info_button} onPress={() => navigation.navigate('CreateServices')}>
            <Text style={sStyle.secondary_button}>{t('Add services')}</Text>
          </TouchableOpacity>
      }
    </View>
  )
}


const sStyle = StyleSheet.create({

  primary: {
    alignItems: 'center',
    top: '45%',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'Lobster-Regular',
    fontSize: 25
  },
  secondary: {
    top: '15%',
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15
  },
  secondary_second: {
    color: '#404C60',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    position: 'absolute',
    left: '30%',
    fontWeight: '900',
    letterSpacing: 0.1
  },
  secondary_button: {
    color: '#D9D9D9',
    fontFamily: 'Nunito-Black',
    fontSize: 15,
  },

});