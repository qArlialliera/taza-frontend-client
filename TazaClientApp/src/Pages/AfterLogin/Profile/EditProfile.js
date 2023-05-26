import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../../styles/Styles';
import { instance } from "../../../Api/ApiManagerPublic";
import { t } from 'i18next';
import Repetear from '../../../MobX/ProfileMobxRener'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import instanceToken from '../../../Api/ApiManager';


export const EditProfile = ({ navigation }) => {


    const [username, setUsername] = useState("");
    const [fullName, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const myImage = new FormData();

    const [isModalVisiblePhoto, setModalVisiblePhoto] = useState(false)
    const [isModalVisibleData, setModalVisibleData] = useState(false)


    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    }
    useEffect(() => {
        instanceToken.get('/user/user-details')
            .then(function (response) {
                // console.log(response.data.id)
                setUsername(response.data.username)
                setFullname(response.data.fullName)
                setAddress(response.data.address)
                setEmail(response.data.email)
            })
            .catch(function (error) {
                console.log('useEffect', error);
            });

    }, []);
    const imagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            savePhoto(image)
        });

    }
    const savePhoto = (image) => {
        console.log('start save image')
        myImage.append('file', {
            uri: Platform.OS === "android" ? image.path : image.path.replace("file://", ""),
            name: `image_${username}.jpg`,
            type: image.mime
        })
        instance.post('/file/save', myImage, config).then((response) => {
            uploadPhoto(response.data)
            console.log('save photo success - ', response.data )
        }).catch((err) => {
            console.log('save photo err - ', err)
        })
    }

    const uploadPhoto = (photoUuid) => {
        instanceToken.put(`/user/photo/upload/${photoUuid}`, null).then((res => {
            console.log('successfully added!', res.data)
            setModalVisiblePhoto(true)
            Repetear.trigger();
        })).catch(err => console.log('uploadPhoto err', err)) 
    }
    const saveProfile = (e) => {
        e.preventDefault();
        const data = { username, fullName, email, address };
        instanceToken.put('/user/edit/profile', data)
            .then(function (response) {
                setModalVisibleData(true)
                console.log('saveProfile', response.data);
                Repetear.trigger();
            })
            .catch(function (error) {
                alert('err')
                console.log('saveProfile', error);
            });

    }
    const backNav = () => {
        navigation.navigate("BottomBar")
    }

    const WrapperComponentPhoto = () => {
        return (
            <View>
                <Modal isVisible={isModalVisiblePhoto}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={()=>setModalVisiblePhoto(false)}>
                            <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Photo Added!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={()=>setModalVisiblePhoto(false)}>
                                        <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
    
                </Modal>
            </View>
        );
    }
    
    const WrapperComponentData = () => {
      return (
          <View>
              <Modal isVisible={isModalVisibleData}>
                  <View style={{ flex: 1 }}>
                      <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={()=>setModalVisibleData(false)}>
                          <Image source={require('../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                      </TouchableOpacity>
                      <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                          <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                              <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Information Updated successfully!</Text>
                              <View style={{ top: '50%' }}>
                                  <TouchableOpacity style={styles.profile_info_button} onPress={()=>setModalVisibleData(false)}>
                                      <Text style={{ color: '#D9D9D9', fontFamily: 'Nunito-Black', fontSize: 15, }}>Ok</Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                  </View>
    
              </Modal>
          </View>
      );
    }


    return (
        <View style={styles.containerwellcome}>
            <ImageBackground source={require('../../../Assets/images/registration.png')} style={styles.back}>
                <WrapperComponentData />
                <WrapperComponentPhoto />
                <TouchableOpacity onPress={backNav} style={{ marginTop: 20, alignItems: 'flex-start' }}>
                    <Image source={require('../../../Assets/images/ic/ri_menu-4-fill.png')} />
                </TouchableOpacity>
                <View style={styles.container2}>
                    <Text style={sStyle.primary}>{t('Edit Profile Page')}</Text>
                    <TextInput style={styles.input} value={fullName} placeholder={"Full Name"} onChangeText={(text) => setFullname(text)} />
                    <TextInput style={styles.input} value={username} placeholder={"Username"} onChangeText={(text) => setUsername(text)} />
                    <TextInput style={styles.input} value={email} placeholder={"Email"} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.input} value={address} placeholder={"Address"} onChangeText={(text) => setAddress(text)} />
                    <TouchableOpacity onPress={() => imagePicker()} style={styles.profile_info_button_secondary}>
                        <Image source={require('../../../Assets/images/upload_photo.png')} style={{ width: 40, height: 40 }} />
                        <Text style={sStyle.secondary_button}>{t('Add Profile Photo')}</Text>
                    </TouchableOpacity>
                </View>



                <TouchableOpacity onPress={(text) => saveProfile(text)} style={styles.profile_info_button}>
                    <Text style={sStyle.secondary_button}>{t('Edit Profile Page')}</Text>
                </TouchableOpacity>

            </ImageBackground>

        </View>
    );
}

const sStyle = StyleSheet.create({

    primary: {
        // top: '45%',
        marginBottom: 20,
        color: '#fff',
        fontFamily: 'Lobster-Regular',
        fontSize: 35
    },
    secondary: {
        top: '15%',
        color: '#fff',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 30
    },
    secondary_button: {
        color: '#D9D9D9',
        fontFamily: 'Nunito-Black',
        fontSize: 15,
    },
});