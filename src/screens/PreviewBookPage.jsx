import {React, useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, } from 'react-native'
import Logo from './../assets/images/logo.png'
import HomePng from './../assets/images/home.png'
import Book from './../assets/images/book.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { Popup } from 'react-native-popup-confirm-toast'
import { GET_SINGLE_BOOK_PREVIEW, RESOURCE_URL } from '../constants/API'
import Pdf from 'react-native-pdf'

import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const PreviewBookPage = ({ route }) => {

    const { bookId } = route.params
    console.log("Book ID ", bookId)

    const navigation = useNavigation()
    const BottomTabNavigator = createBottomTabNavigator()

    const [bookName, setBookName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [writer, setWriter] = useState('') 
    const [price, setPrice] = useState('')
    const [photo, setPhoto] = useState('')
    const [file, setFile] = useState('')
    const [writerId, setWriterId] = useState('')

    //Load book data
    useEffect(()=>{

        axios.get(GET_SINGLE_BOOK_PREVIEW + bookId)
        .then(response => {
            // console.log(response.data['data'])
            // console.log(RESOURCE_URL + "/" +response.data['data'].photo)
            if(response.data['msg'] == "success"){
                setBookName(response.data['data'].name)
                setCategory(response.data['data'].category)
                setDescription(response.data['data'].description)
                setWriter(response.data['data'].writer)
                setPrice(response.data['data'].price)
                setPhoto( RESOURCE_URL + "/" + response.data['data'].photo)
                setFile(RESOURCE_URL + "/" + response.data['data'].file)
                setWriterId(response.data['data'].writer_id)
                console.log(file)
                // console.log('set done')
            }else{
                console.log('No books')
            }
        })
        .catch(error => {
            console.error(error.response.data)
        });
    },[])

    const readBook = () =>{
        navigation.navigate('ViewPdf', {file: file})
    }

  return (
    <SafeAreaView>
        <ScrollView className="flex flex-col w-full">
            <View className="w-full h-[180px] bg-[#FFC076] relative flex flex-col justify-between items-center ">
                <Image
                    source={HomePng}
                    className="w-full h-[180px] overflow-hidden absolute object-cover"
                />
                <View className="w-full h-auto flex flex-row pt-6 px-6 justify-between">
                    <TouchableOpacity className="w-[45px] h-[45px]  rounded-custom border-[2px] border-black flex justify-center items-end" onPress={()=>{navigation.navigate('MainNavigation', { screen: 'Home' })}}>
                        {/* icon here */}
                        <Icon name="arrow-back-ios" size={28} color="#000000"  />
                    </TouchableOpacity>
                    <Image
                        source={Logo}
                        className="w-52 h-24"
                    />
                </View>
            </View>
            <View className="w-full h-auto !pt-12 pb-6 justify-center items-center">
                { photo == '' ? <></> :
                    <Image
                        source={{uri:photo}}
                        className="w-[120px] h-[120px] object-cover rounded-custom"
                    />
                }
            </View>
            <View className="w-full h-auto px-6 flex flex-col justify-center items-start">
                <Text className="text-[22px] font-semibold text-[#000000]">
                    {bookName == "" ? <></>: bookName}
                </Text>
                <Text className="text-[16px] font-medium text-[#959595] pt-1">
                    {writer == '' ? <></>: writer + '  • ' } {category == '' ? <></>: category}
                </Text>
                <Text className={`text-[18px] font-bold ${price == 0 ? "text-[#13AB3E]" : "text-[#959595] "}  pt-2`}>
                    {price == '' ? <></>:price == 0 ? "Free" : price+' /='}
                </Text>
                <Text className="text-[16px] font-medium text-[#959595] pt-4 leading-20">
                    {description == "" ? <></>:description}
                </Text>
                {price == '' ? <></>:price == 0 
                ? 
                    <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-full my-6" onPress={()=>{readBook()}}>
                        <Text className="text-white text-[18px] text-center font-medium">
                            Read Book
                        </Text>
                    </TouchableOpacity>
                : 
                    <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-full my-6" onPress={()=>{navigation.navigate('CheckoutPage', {bookId : bookId, price: price, writerId: writerId,})}}>
                        <Text className="text-white text-[18px] text-center font-medium">
                            Pay Now
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default PreviewBookPage