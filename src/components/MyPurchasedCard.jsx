import {React, useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, FlatList, } from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Book from '../assets/images/book2.png'
import { DELETE_PURCHASED_BOOK, RESOURCE_URL } from '../constants/API'
import axios from 'axios'
import { Popup, Toast } from 'react-native-popup-confirm-toast'


import { useNavigation } from '@react-navigation/native'

const MyPurchasedCard = ({name, date, writer, photo, mkey, file}) => {

  let myFile = file

  const navigation = useNavigation()

  let modifiedPhoto = RESOURCE_URL+'/'+photo 

  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  const deleteBook = (bookId, file) =>{
    // console.log(bookId)
    axios.get(DELETE_PURCHASED_BOOK + bookId)
    .then(response => {
        // console.log(response.data['msg'])
        if(response.data['msg'] == 'success'){
          Toast.show({
            title: 'Book removed successfully!',
            text: 'Successfully removed the book.',
            backgroundColor: '#13AB3E',
            timeColor: '#A8A3A7',
            timing: 3000,
            icon: <Icon name={'done'} color={'#fff'} size={28}/>,
            position: 'top',
            statusBarType:'dark-content',
          })
          navigation.navigate('MainNavigation', { screen: 'Home' })
        }else{
            console.log('Not deleted => Error')
        }
    })
    .catch(error => {
        console.error(error.response.data)
    });
  }

  const readBook = () =>{
    let newFile = RESOURCE_URL + "/" + myFile
    console.log(myFile)
    navigation.navigate('ViewPdf', {file: newFile})
  }

  return (
    <TouchableOpacity className="w-full h-[140px] flex flex-row justify-between items-center" key={mkey} onPress={()=>{readBook()}}>
      <View className="w-auto h-auto flex flex-col justify-center items-center object-cover overflow-hidden">
          <Image
              source={{uri:modifiedPhoto}}
              className="w-[100px] h-[100px] object-cover rounded-custom"
          />
      </View>
      <View className="h-full w-auto flex flex-col justify-center items-start grow pl-3">
        <Text className="text-[16px] font-medium text-[#9B3434]">
          {name}
        </Text>
        <Text className="text-[16px] font-medium text-[#959595] pt-1">
          {writer}
        </Text>
        <Text className="text-[16px] font-medium text-[#959595] pt-2">
          {formattedDate}
        </Text>
      </View>
      <View className="h-full w-auto flex flex-row justify-between items-center">
        <TouchableOpacity className="ml-3" onPress={()=>{deleteBook(mkey)}}>
          <Ion name="trash" size={28} color="#9B3434" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default MyPurchasedCard