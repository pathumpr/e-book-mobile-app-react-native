import {React, useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, FlatList, } from 'react-native'
import Logo from './../assets/images/logo.png'
import HomePng from './../assets/images/background4.png'
import Ion from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MyUploadsCard from '../components/MyUploadsCard'
import axios from 'axios'
import { GET_WRITER_UPLOADS } from '../constants/API'

import { useNavigation } from '@react-navigation/native'

const MyUploadsPage = ({ route }) => {

    const navigation = useNavigation()

    const [booksArray, setBooksArray] = useState([]);
    const [view, setView] = useState(0);

    // load data until screen is loading
    useEffect(()=>{
        // console.log('USING USE EFFECT')
        axios.get(GET_WRITER_UPLOADS + globalId)
        .then(response => {
            // console.log(response.data['data'])
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
    },[])

  return (
    <SafeAreaView>
        <ScrollView className="flex w-full">
            <View className="w-full h-[180px] bg-[#FFC076] relative flex flex-col justify-between items-center ">
                <Image
                    source={HomePng}
                    className="w-full h-[180px] overflow-hidden absolute object-cover"
                />
                <View className="w-full h-auto flex flex-row pt-6 px-6 justify-between relative">
                    <TouchableOpacity className="w-[45px] h-[45px]  rounded-custom border-[2px] border-[#9B3434] flex justify-center items-end" onPress={()=>{navigation.navigate('ProfilePage')}}>
                        {/* icon here */}
                        <Icon name="arrow-back-ios" size={28} color="#9B3434"  />
                    </TouchableOpacity>
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
                    My Uploads
                </Text>
            </View>
            <View className="w-full h-full px-6 py-0 flex flex-col">
            { 
                view == 0
                ?
                booksArray.map((book, index) => (
                    <MyUploadsCard key={index}
                        mkey={book.book_id}
                        name={book.name}
                        price={book.price}
                        date={book.created_at}
                        photo={book.photo}
                    />
                ))
                :
                <View className="w-full h-[300px] flex px-6 justify-center items-center">
                    <Text className="text-[18px] font-bold text-[#A8A3A7]">
                        No books uploaded
                    </Text>
                </View>
            }

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default MyUploadsPage