import React, { useState, useEffect } from 'react'
import { Text, View, ImageBackground, Image, TextInput, Switch, ScrollView, TouchableOpacity } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { styles } from '../../../../styles/Styles';
import Modal from "react-native-modal";
import { getAccessToken } from '../../../../Storage/TokenStorage';
import { instance } from '../../../../Api/ApiManager';
import StarRating from 'react-native-star-rating-widget';

export const BookFeatures = (company) => {
    const comp = JSON.parse(JSON.stringify(company)).route.params
    console.log('comp', comp)
    //token
    const [token, setToken] = useState(readItemFromStorage);
    const readItemFromStorage = async () => { const item = await getAccessToken(); setToken(item) };
    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    //useStates
    const [isModalVisible, setModalVisible] = useState(false);

    const [area, setArea] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [comments, setOtherComments] = useState();
    const [userData, setUserData] = useState();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState("");
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState("");
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false);
    let Dates = new Date()

    const [currentRating, setCurrentRating] = useState(0);

    useEffect(() => {
        readItemFromStorage()


        instance.get('private/user/user-details', config).then(function (response) {
            setUserData(response.data)
        }).catch(function (error) {
            console.log(error);
        });
        instance.get(`/private/review/rating/${comp.pp.id}`, config).then((res) => {
            setCurrentRating(res.data)
        }).catch(err => console.log(err))
        // console.log('selectedServices -', selectedServices)

    }, [token, time, date, selectedServices])

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

    //select additional services
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const handleCategoryPress = (category, service) => {


        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
            setSelectedServices(selectedServices.filter((s) => s !== service));
        } else {
            setSelectedCategories([...selectedCategories, category]);
            setSelectedServices([...selectedServices, service])
        }

    };

    //button
    const sendData = (e) => {
        Dates = date + "T" + time + ':00.000Z'
        const data = {
            companyService: comp.i,
            company: comp.pp,
            user: userData,
            date: Dates,
            address: userData.address,
            area: area,
            rooms: rooms,
            withPet: isEnabled,
            additionalServices: selectedServices,
            comment: comments,
            status: {
                id: 1
            }
        }
        // console.log('data: ', data)
        // console.log('comp: ', comp)
        setModalVisible(true)
        instance.post('/private/orders/add', data, config).then((res) => {
            setModalVisible(true)
            console.log(res)
        }).catch((error) => console.log(error))

    }

    const toggleModal = () => {
        setModalVisible(false);
    };



    const WrapperComponent = () => {
        return (
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleModal} >
                            <Image source={require('../../../../Assets/images/ic/ri_close-circle-line.png')} style={{ zIndex: -1 }} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#D9D9D9', borderRadius: 1000, width: '120%', height: 600, alignSelf: 'center', bottom: '-40%', alignItems: 'center' }}>
                            <View style={{ position: 'relative', marginTop: 150, width: '70%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Black', fontSize: 25, fontWeight: '600', color: '#414C60', alignSelf: 'center' }}>Thank you for the order! The company will contact you!</Text>
                                <View style={{ top: '50%' }}>
                                    <TouchableOpacity style={styles.profile_info_button} onPress={toggleModal}>
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
        <ScrollView style={styles.containerwellcome}>

            <WrapperComponent />
            <ImageBackground source={require('../../../../Assets/images/homeBack.png')} style={styles.back}>

                {/* Standart info */}
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Image source={require('../../../../Assets/images/newimg.png')} style={styles.circleimg} />
                    <Text style={styles.primary}>
                        {comp.pp.name}
                    </Text>
                    {/* <Image source={require('../../../../Assets/images/raiting.png')} /> */}
                    <StarRating
                        rating={currentRating}
                        color='#EFD3D7'
                        enableSwiping={false}
                        onChange={() => console.log()}
                    />
                    <Text style={styles.book_bodytext}>
                        {comp.j.name}
                    </Text>
                </View>


                <View style={{ marginHorizontal: 30 }} id='Area and Room Input'>
                    {/* area, rooms, animals */}
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.book_bodytext}>Area(m2)</Text>
                        <TextInput keyboardType="numeric" style={styles.num_input} onChangeText={(value) => setArea(value)} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.book_bodytext}>Rooms</Text>
                        <TextInput keyboardType="numeric" style={styles.num_input} onChangeText={(value) => setRooms(value)} />
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
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {
                                comp.services ?
                                    comp.services.map((i) =>
                                        i.categories.map((j) => {
                                            if (j.id != comp.j.id) {
                                                return (
                                                    <View
                                                        key={j.id}
                                                    // style={{
                                                    //     flexDirection: 'row',
                                                    //     flexWrap: 'wrap',
                                                    //     justifyContent: 'space-between',
                                                    //     width: '100%'
                                                    // }}
                                                    >
                                                        <TouchableOpacity
                                                            style={{
                                                                backgroundColor: selectedCategories.includes(j.name)
                                                                    ? '#FEC7CF'
                                                                    : '#D9D9D9',
                                                                marginTop: 5,
                                                                paddingHorizontal: 20,
                                                                paddingVertical: 10,
                                                                borderRadius: 17,
                                                                marginHorizontal: 5,
                                                            }}
                                                            onPress={() => handleCategoryPress(j.name, i)}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Nunito-Regular',
                                                                    color: '#414C60',
                                                                    fontWeight: 'bold',
                                                                }}
                                                            >
                                                                {j.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        }
                                        )
                                    )

                                    : null
                            }
                        </View>
                    </View>

                    {/* <TextInput style={styles.inputText} placeholder="Other wishes" onChangeText={(text) => setOtherWishes(text)}></TextInput> */}

                    {/* Your Comments */}
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.book_bodytext}>Your Comments</Text>
                    </View>
                    <TextInput style={styles.inputText} placeholder="Your Comments" onChangeText={(text) => setOtherComments(text)}></TextInput>



                    <TouchableOpacity style={styles.profile_info_button} onPress={sendData}>
                        <Text style={styles.secondary_button}>Apply</Text>
                    </TouchableOpacity>


                </View>



            </ImageBackground>
        </ScrollView>
    )
}
