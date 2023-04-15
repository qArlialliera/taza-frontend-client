import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { HereAutoComplete } from 'react-here-autocomplete';
import axios from 'axios'
import AutocompleteInput from 'react-native-autocomplete-input';

// const AstanaCoordinates = {
//   lat: 51.1285,
//   lng: 71.4304,
// };


export const OpenMap = () => {
  const YOUR_API_KEY = '_S32CBC0HHzkPIqK3QMuthPQpegIXWlsKjtzU4boKQE'
  // const YOUR_APP_CODE = 'UWvPrGVui0LbFWb0znu4Yg'
  // const handleSelect = (suggestion) => {
  //   console.log(suggestion);
  // };
  // axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=240+Washington+St.%2C+Boston&limit=4&apiKey=${YOUR_API_KEY}`)
  // .then((res)=>{
  //   console.log(res)
  // https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json
  // })
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // const handleSearch = async (query) => {
  //   const response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=Astana%2C+Kazakhstan&limit=4&apiKey=${YOUR_API_KEY}`);
  //   setSuggestions(response.data.suggestions);
  // };

  useEffect(() => {
    // axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=Astana%2C+Kazakhstan&apiKey=${YOUR_API_KEY}`)
    axios.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=Berli&apiKey=${YOUR_API_KEY}`)
    .then((response)=>{
      console.log(response)
      // setSuggestions(response.data.suggestions);
    })
    
  

  }, [suggestions])
  
  return (
    <View>
      <Text>Hi</Text>
      <AutocompleteInput
        data={suggestions} 
        // value={searchTerm}
        // onChangeText={setSearchTerm}
        // handleSelectItem={(item) => console.log(item)}
        // placeholder="Start typing an address"
        // renderItem={(item, index) => (
        //   <View key={index} style={{ padding: 10 }}>
        //     <Text>{item.label}</Text>
        //   </View>
        // )}
        />
    </View>
  )
}
