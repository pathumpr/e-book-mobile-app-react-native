import {React, useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, FlatList, } from 'react-native'
import Logo from './../assets/images/logo.png'
import HomePng from './../assets/images/home.png'
import Ion from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Book from '../assets/images/book2.png'
import { RESOURCE_URL, DELETE_BOOK } from '../constants/API'
import { Popup, Toast } from 'react-native-popup-confirm-toast'
import axios from 'axios'

import { useNavigation } from '@react-navigation/native'

const MyUploadsCard = ({name, date, price, photo, mkey}) => {

  const navigation = useNavigation()

  let modifiedPhoto = RESOURCE_URL+'/'+photo

  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  //delete book
  const deleteBook = (bookId) =>{
    console.log(bookId)
    axios.get(DELETE_BOOK + bookId)
    .then(response => {
        console.log(response.data['msg'])
        if(response.data['msg'] == 'success'){
          Toast.show({
            title: 'Book deleted successfully!',
            text: 'Successfully deleted the book.',
            backgroundColor: '#13AB3E',
            timeColor: '#A8A3A7',
            timing: 3000,
            icon: <Icon name={'done'} color={'#fff'} size={28}/>,
            position: 'top',
            statusBarType:'dark-content',
          })
          navigation.navigate('ProfilePage')
        }else{
            console.log('Not deleted => Error')
        }
    })
    .catch(error => {
        console.error(error.response.data)
    });
  }

  return (
    <View className="w-full h-[140px] flex flex-row justify-between items-center" key={mkey}>
      <View className="w-auto h-auto flex flex-col justify-center items-center object-cover overflow-hidden">
          <Image
              source={{uri:modifiedPhoto}}
              className="w-[100px] h-[100px] object-cover rounded-custom"
          />
      </View>
      <View className="h-full w-[100px] flex flex-col justify-center items-start grow pl-3">
        <Text className="text-[16px] font-medium text-[#9B3434]">
            {name}
        </Text>
        <Text className="text-[14px] font-medium text-[#959595] pt-1">
            {formattedDate}
        </Text>
        <Text className={`text-[16px] font-bold ${price == 0 ? "text-[#13AB3E]" : "text-[#959595] "}  pt-2`}>
            {price == 0 ? "Free" : price+' /='}
        </Text>
      </View>
      <View className="h-full w-auto flex flex-row justify-between items-center">
        <TouchableOpacity onPress={()=>{navigation.navigate('EditBookPage', { bookId: mkey })}}>
          <Ion name="create" size={28} color="#9B3434" />
        </TouchableOpacity>
        <TouchableOpacity className="ml-3"onPress={() =>{
            Popup.show({
                type: 'confirm',
                title: 'Delete Book',
                textBody: 'Are you sure to want to delete this book?',
                buttonText: 'Delete',
                confirmText: 'Cancel',
                okButtonStyle:  {backgroundColor: '#E04B4B'},
                callback: () => {
                    deleteBook(mkey)
                    Popup.hide();
                },
                cancelCallback: () => {
                    Popup.hide();
                },
            })
        }}>
          <Ion name="trash" size={28} color="#9B3434" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyUploadsCard