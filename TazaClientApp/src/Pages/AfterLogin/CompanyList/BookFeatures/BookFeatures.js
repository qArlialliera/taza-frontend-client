import React, { useState, useEffect } from 'react'
import { Text, View, ImageBackground, Image, TextInput, Switch, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import format from "date-fns/format";
import { styles } from '../../../../styles/Styles';
import { Modal } from 'react-native-modal';
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { ExtraFeautures } from './ExtraFeautures';


export const BookFeatures = (company) => {
    const comp = JSON.parse(JSON.stringify(company)).route.params

    //token
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    //useStates
    const [isModalVisible, setModalVisible] = useState(false);

    const [area, setArea] = useState("");
    const [rooms, setRooms] = useState("");
    const [extraF, setExtraF] = useState([]);
    const [otherWishes, setOtherWishes] = useState();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isActiveId, setIsActiveId] = useState(0)

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState("");
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState("");
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false);
    let Dates = new Date()

    useEffect(() => {
        readItemFromStorage()
        Dates = date + "T" + time + ':00.000Z'
        // console.log('Dates - ', Dates)
    }, [token, time, date])

    //timepicker
    function showDatePicker() { setDatePicker(true); };
    function showTimePicker() { setTimePicker(true); };
    function onDateSelected(value) {
        setDate(getFormatedDate(value, "YYYY-MM-DD"));
        setDatePicker(false);
        setIsDateSelected(true)
    };
    function onTimeSelected(value) {
        setTime(value);
        setTimePicker(false);
        setIsTimeSelected(true)
    };



    //button
    const sendData = (e) => {
        // e.preventDefault();
        // // console.log('a - ',area)
        // const data = {
        //     area: area,
        //     rooms: rooms,
        //     animals: isEnabled,
        //     otherWishes: otherWishes,
        //     extraF: extraF
        // }
        // console.log('data: ', data)
        // setModalVisible(true);

    }

    const toggleModal = () => {
        setModalVisible(false);
    };

    const catAdd = ([id]) => {
        if (isActiveId === 0) setIsActiveId(id);
        else setIsActiveId(0)
    }

    return (
        <ScrollView style={styles.containerwellcome}>
            <ImageBackground source={require('../../../../Assets/images/homeBack.png')} style={styles.back}>

                {/* Standart info */}
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Image source={require('../../../../Assets/images/newimg.png')} style={styles.circleimg} />
                    <Text style={styles.primary}>
                        {comp.pp.name}
                    </Text>
                    <Image source={require('../../../../Assets/images/raiting.png')} />
                    <Text style={styles.book_bodytext}>
                        {comp.j.name}
                    </Text>
                </View>


                <View style={{ marginHorizontal: 30 }} id='Area and Room Input'>
                    {/* area, rooms, animals */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.book_bodytext}>Area(m2)</Text>
                        <TextInput keyboardType="numeric" style={styles.num_input} onChangeText={(text) => setArea(text)} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.book_bodytext} onChangeText={() => setRooms()}>Rooms</Text>
                        <TextInput keyboardType="numeric" style={styles.num_input} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Animals</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#D9D9D9' }}
                            thumbColor={isEnabled ? '#CCACB3' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ position: 'absolute', left: '50%' }}
                        />
                    </View>

                    {/* Date */}
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Select Date and Time</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                            {datePicker && (
                                <DatePicker
                                    options={{
                                        backgroundColor: '#D9D9D9',
                                        textHeaderColor: '#414C60',
                                        textDefaultColor: '#414C60',
                                        selectedTextColor: '#fff',
                                        mainColor: '#414C60',
                                        textSecondaryColor: '#414C60',
                                    }}
                                    mode="calendar"
                                    minuteInterval={30}
                                    style={{ borderRadius: 10 }}
                                    onSelectedChange={date => onDateSelected(date)}
                                />
                            )}
                            {timePicker && (
                                <DatePicker
                                    mode="time"
                                    minuteInterval={1}
                                    options={{
                                        backgroundColor: '#D9D9D9',
                                        textHeaderColor: '#414C60',
                                        textDefaultColor: '#414C60',
                                        selectedTextColor: '#fff',
                                        mainColor: '#414C60',
                                        textSecondaryColor: '#414C60',
                                        // borderColor: 'rgba(122, 146, 165, 0.1)',
                                    }}
                                    style={{ borderRadius: 10, marginVertical: 10 }}
                                    onTimeChange={selectedTime => onTimeSelected(selectedTime)}
                                // selected={getFormatedDate(new Date(), 'HH:mm:ss.SSS')}
                                />
                            )}
                            {isDateSelected ?
                                <TouchableOpacity onPress={showDatePicker} style={styles.dateTimeBtn}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold', textAlign: 'center' }}>Selected date - {date}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={showDatePicker} style={styles.dateTimeBtn}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold' }}>Select Date</Text>
                                </TouchableOpacity>}

                            {isTimeSelected ?
                                <TouchableOpacity onPress={showTimePicker} style={styles.dateTimeBtn}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold', textAlign: 'center' }}>Selected Time - {time}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={showTimePicker} style={styles.dateTimeBtn}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold' }}>Select Time</Text>
                                </TouchableOpacity>}
                        </View>
                    </View>
                    {/* ExtraFeutures */}
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Extra Features</Text>
                        <ExtraFeautures props={comp} services={comp.services}/>
                    </View>

                    <TextInput style={styles.inputText} placeholder="Other wishes" onChangeText={(text) => setOtherWishes(text)}></TextInput>

                    {/* Your Comments */}
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Your Comments</Text>
                    </View>
                    <TextInput style={styles.inputText} placeholder="Your Comments"></TextInput>



                    <TouchableOpacity style={styles.profile_info_button} onPress={sendData}>
                        <Text style={styles.secondary_button}>Apply</Text>
                    </TouchableOpacity>
                    {/* <View>
                        <Modal isVisible={isModalVisible}>
                            <View style={{ flex: 1 }}>
                                <Text>Hello!</Text>

                                <TouchableOpacity onPress={toggleModal}>
                                    <Text>HIDE ME</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View> */}

                </View>



            </ImageBackground>
        </ScrollView>
    )
}
