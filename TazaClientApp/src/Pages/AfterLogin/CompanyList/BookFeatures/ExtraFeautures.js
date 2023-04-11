import React, {useState} from 'react'
import { FlatList, View, TouchableOpacity, Text, Pressable } from 'react-native'




export const ExtraFeautures = (props, services) => {
    const pp = props.props
    const serv = props.services

    const [selectedItems, setSelectedItems] = useState([]);


    const renderItem = ({ item }) => {
        let items = [];
        if (item.categories) {
            items = item.categories.map(drink => {
                if (drink.id != pp.j.id) {
                    return (
                        // <Pressable onPress={deSelectItems} style={{ flex: 1, padding: 15 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#D9D9D9', marginTop: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 17, marginHorizontal: 5 }}
                                >
                                <Text style={{ fontFamily: 'Nunito-Regular', color: '#414C60', fontWeight: 'bold' }}>{drink.name}</Text>
                            </TouchableOpacity>
                        // </Pressable>
                    )
                }
            })
        }

        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {items}
            </View>
        )
    }
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            {/* <FlatList data={pp}
                renderItem={({ item }) =>

                    <Button mode="outlined"
                        color={item.selected == true ? '#ffffff' : '#e1601f'} // color of button will change according to selection

                        style={
                            item.selected == true
                                ? {
                                    margin: 5, borderRadius: 2, backgroundColor: '#e1601f',
                                }
                                : {
                                    margin: 5, borderRadius: 2, backgroundColor: '#ffffff',
                                }
                        }
                        onPress={() => this.onPressHandler(item.id)} >{item.name}
                    </Button>

                } /> */}

            <FlatList
                data={serv}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ width: '100%' }}
                numColumns={3}

            />
        </View>
    )
}
