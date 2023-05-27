import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { CompanyList } from '../CompanyList/CompanyList';
import { Messages } from '../Messages/Messages';

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';
const Tab = AnimatedTabBarNavigator();

export const BottomBar = () => {
    return (
        <Tab.Navigator style={sStyle.contaiter}
            tabBarOptions={{
                showIcon: true, activeBackgroundColor: '#414C60',
                tabStyle: {
                    backgroundColor: '#8E9AAF',
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    elevation: 9,
                    shadowOffset: {
                        width: 0,
                        height: -13,
                    },
                    shadowColor: '#000000',
                },
                labelStyle: { color: '#D9D9D9', }
            }} >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => (<Icon name="home" size={24} color='#D9D9D9' />)


            }} />
            <Tab.Screen name="CompanyList" component={CompanyList} options={{
                tabBarIcon: () => (<Icon name="box" size={24} color='#D9D9D9' />)
            }} />
            <Tab.Screen name="Messages" component={Messages} options={{
                tabBarIcon: () => (<Icon name="message-square" size={24} color='#D9D9D9' />)
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: () => (<Icon name="user" size={24} color='#D9D9D9' />)
            }} />
        </Tab.Navigator>
    );
}






const sStyle = StyleSheet.create({
    contaiter: {
        backgroundColor: '#8E9AAF'
    },
    tabstyle: {
        backgroundColor: '8E9AAF',
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
    }
})