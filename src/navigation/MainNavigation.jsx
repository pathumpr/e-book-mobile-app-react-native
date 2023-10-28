import {React, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from '../screens/HomePage'
import MyPurchasedPage from '../screens/MyPurchasedPage'
import ReaderProfilePage from '../screens/ReaderProfilePage';


const Tab = createBottomTabNavigator();

const MainNavigation = ({ route })=>{
    return(
        <Tab.Navigator 
            initialRouteName='HomePage'
            screenOptions={({route})=>({
                headerShown: false,
                tabBarActiveTintColor: '#9B3434',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: { 
                    backgroundColor: '#000000',
                    height: 70,
                },

            })}
                
            tabBarOptions={{
                labelStyle:{ 
                    marginBottom: 10,                
                },
            }}
        >

            <Tab.Screen 
                name='Home' 
                component={HomePage} 
                options={{
                    tabBarIcon:({color, size})=>(
                        <Icon name='home' color={color} size={28}/>
                    )
                }} 
            />

            <Tab.Screen 
                name='My Books' 
                component={MyPurchasedPage} 
                options={{
                    tabBarIcon:({color, size})=>(
                        <Icon name='book' color={color} size={28}/>
                    )
                }} 
            />

            <Tab.Screen 
                name='Profile' 
                component={ReaderProfilePage} 
                options={{
                    tabBarIcon:({color, size})=>(
                        <Icon name='person' color={color} size={28}/>
                    )
                }} 
            />

        </Tab.Navigator>
    )
}

export default MainNavigation;