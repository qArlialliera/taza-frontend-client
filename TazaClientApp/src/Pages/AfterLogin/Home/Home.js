import React, { useEffect, useState } from 'react'
import { ImageBackground, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../../styles/Styles'
import { Search } from './Search';
import '../../../Translations/i18n'
import { useTranslation } from 'react-i18next';
import { getLanguage } from '../../../Storage/LanguageStorage';


const DATA = [
    { id: 1, name: 'General Cleaning', img: require('../../../Assets/images/icon_general.png') },
    { id: 2, name: 'Wet Cleaning', img: require('../../../Assets/images/icon_wet.png') },
    { id: 4, name: 'Cleaning after repair', img: require('../../../Assets/images/icon_repair.png') },
    { id: 3, name: 'Office Cleaning', img: require('../../../Assets/images/icon_office.png') },
]




export const Home = ({ navigation }) => { 

    //language
    const { t, i18n } = useTranslation();
    const [language, setStorageLanguage] = useState();
    const readLanguage = async () => { const item = await getLanguage(); setStorageLanguage(item) };
    const [currentLanguage, setLanguage] = useState();

    useEffect(() => {
        readLanguage()
        console.log(language)
        changeLanguage(language)
    }, [language])

    const changeLanguage = (value) => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    const ReplaceWithAll = () => {
        navigation.navigate("all_categories")
    }
    return (
        <ScrollView style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/homeBack.png')} style={styles.imagehome}>
                <Search onPress={()=>navigation.navigate("CompanyList")}/>
                <TouchableOpacity style={styles.divspecial} onPress={()=>navigation.navigate('SpecialOffers')}>
                    <Text style={{ alignItems: 'center',  color: '#414C60', fontFamily: 'Lobster-Regular', fontSize: 25 }}>{t('Special_Offers')}</Text>
                </TouchableOpacity>
                <Text style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, color: '#D9D9D9', fontFamily: 'Nunito-SemiBold', fontSize: 20 }}>{t('Select by category')}</Text>
                <View>
                    <View style={styles.grid}>
                        {
                            DATA.map((u) => {
                                return (
                                    <View key={u.id} >
                                        <TouchableOpacity style={styles.card_category} onPress={() => navigation.navigate('FindByCategory', u)}>
                                            <Image style={styles.image_card} resizeMode="cover" source={u.img} />
                                            <Text style={styles.name}>{i18n.t(u.name)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }

                    </View>
                    <TouchableOpacity style={styles.button} onPress={ReplaceWithAll}>
                        <Text style={{color: '#414C60',fontFamily: 'Nunito-SemiBold',fontSize: 15,top: '25%',}}>{t('All Categories')}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </ScrollView>
    )
}