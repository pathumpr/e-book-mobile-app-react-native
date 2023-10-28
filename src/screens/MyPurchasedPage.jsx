import {React, useState, useEffect, useCallback } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, FlatList, } from 'react-native'
import Logo from './../assets/images/logo.png'
import HomePng from './../assets/images/background4.png'
import Ion from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPurchasedCard from '../components/MyPurchasedCard';
import axios from 'axios'
import { GET_READER_PURCHASED_BOOKS, RESOURCE_URL } from '../constants/API'
import { useFocusEffect } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MyPurchasedPage = () => {

    const navigation = useNavigation()
    const BottomTabNavigator = createBottomTabNavigator()

    const [booksArray, setBooksArray] = useState([]);
    const [view, setView] = useState(0);

    // useEffect(()=>{
    //     console.log('puchades effect')
    //     axios.get(GET_READER_PURCHASED_BOOKS + globalId)
    //     .then(response => {
    //         console.log(response.data)
    //         // if(response.data['count'] > 0){
    //         //     setBooksArray(response.data['data'])
    //         // }else{
    //         //     console.log('No books')
    //         //     setView(1)
    //         // }
    //     })
    //     .catch(error => {
    //         console.error(error.response.data)
    //     });
    // },[])

    useFocusEffect(
        useCallback(() => {
          console.log('Home tab is focused. Screen is reloaded.');
          setBooksArray([])
          setView(0)
          console.log("View-1 =",view)
          // Add any reload/fetch data logic here.
        axios.get(GET_READER_PURCHASED_BOOKS + globalId)
        .then(response => {
            // console.log(response.data['data'])
            // console.log(response.data['count'])
            // console.log(response.data['count'])
            if(response.data['count'] > 0){
                setBooksArray(response.data['data'])
            }else{
                console.log('No books')
                setView(1)
            }
        })
        .catch(error => {
            console.error(error.response.data)
        });
        }, [])
    );

  return (
    <SafeAreaView>
        <ScrollView className="flex w-full">
            <View className="w-full h-[180px] bg-[#FFC076] relative flex flex-col justify-between items-center ">
                <Image
                    source={HomePng}
                    className="w-full h-[180px] overflow-hidden absolute object-cover"
                />
                <View className="w-full h-auto flex flex-row pt-6 px-6 justify-between relative">
                    <Image
                        source={Logo}
                        className="w-52 h-24"
                    />
                </View>
                <View className="w-[100px] h-[100px] rounded-full bg-[#9B3434] justify-center items-center absolute right-6 -bottom-[50px] overflow-hidden">
                    {globalPic == 'n' ? <Ion name="person" size={55} color="#fff" /> : <Image source={{uri:globalPic}} className="w-[100px] h-[100px]"/>}
                </View>
            </View>
            <View className="w-full h-auto flex flex-col pt-6 px-6 mb-6">
                <Text className="text-[18px] font-bold text-[#9B3434]">
                    My purchased books
                </Text>
            </View>
            <View className="w-full h-full px-6 py-0 flex flex-col">
            {console.log('View-2 = ',view, )}
                { 
                view == 0
                ?
                booksArray.map((book, index) => (
                    <MyPurchasedCard key={index}
                        mkey={book.book_id}
                        name={book.name}
                        writer={book.writer}
                        date={book.created_at}
                        photo={book.photo}
                        file={book.file}
                    />
                ))
                :
                <View className="w-full h-[300px] flex px-6 justify-center items-center">
                    <Text className="text-[18px] font-bold text-[#A8A3A7]">
                        No books purchased
                    </Text>
                </View>
            }
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default MyPurchasedPage