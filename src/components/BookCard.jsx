import React from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native'
import Book from '../assets/images/book.png'
import { RESOURCE_URL } from '../constants/API'
import { Dimensions } from 'react-native';


import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const BookCard = ({photo, bookName, mkey, writer, price}) => {

    const navigation = useNavigation()
    const BottomTabNavigator = createBottomTabNavigator()

    let modifiedPhoto = RESOURCE_URL+'/'+photo

    // const { width } = Dimensions.get('window')
    // const size = parseInt(width / 3)
    // console.log(size)


  return (
    <TouchableOpacity className="w-1/3 h-auto basis-1/2 px-2 py-4 flex flex-col justify-start items-center" onPress={()=>{navigation.navigate('PreviewBookPage', {bookId: mkey})}} key={mkey}>
        <View className="w-full h-auto flex flex-col justify-center items-center">
            <Image
                source={{uri:modifiedPhoto}}
                className='w-full h-[120px] object-cover rounded-custom'
            />
        </View>
        <View className="w-full h-auto flex flex-col justify-center items-start pt-4">
            <Text className="text-[16px] font-medium text-[#9B3434]">
                {bookName}
            </Text>
            <Text className="text-[16px] font-medium text-[#959595] pt-1">
                {writer}
            </Text>
            <Text className={`text-[16px] font-bold ${price == 0 ? "text-[#13AB3E]" : "text-[#959595] "}  pt-2`}>
                {price == 0 ? "Free" : price+' /='}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default BookCard