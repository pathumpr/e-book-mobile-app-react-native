import {React, useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios'
import { CHECKOUT } from '../constants/API'
import { Toast } from 'react-native-popup-confirm-toast'

import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationActions } from 'react-navigation'

const CheckoutPage = ({ route }) => {

    const { bookId, writerId, price } = route.params
    console.log(bookId, writerId, price)
    console.log(globalId)
    
    const navigation = useNavigation()
    const BottomTabNavigator = createBottomTabNavigator()

    const [method, setMethod] = useState();

    const handleSubmit = ()=>{
        if (!method){
            Toast.show({
                title: 'Plaese select a payment method',
                text: 'Fill all fields to continue',
                backgroundColor: '#E04B4B',
                timeColor: '#A8A3A7',
                timing: 3000,
                icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                position: 'top',
                statusBarType:'dark-content',
            })
            return
        }else{
            axios.post(CHECKOUT,
                {
                    bookId,
                    writerId,
                    globalId,
                    price,
                    method,
                }
            )
            .then(response => {
                console.log(response.data)
                // console.log(RESOURCE_URL + "/" +response.data['data'].photo)
                if(response.data['msg'] == "success"){
                    navigation.navigate('MainNavigation', { screen: 'My Books' })
                }else{
                    console.log('No books')
                }
            })
            .catch(error => {
                console.error(error.response.data)
            });
        }
    }

  return (
    <SafeAreaView>
        <ScrollView>
            <View className="w-full h-auto p-6 flex flex-col justify-center items-center">
                <View className="w-full h-auto flex flex-row items-center justify-start">
                    <TouchableOpacity className="w-[45px] h-[45px]  rounded-custom border-[2px] border-[#9B3434] flex justify-center items-end" onPress={()=>{navigation.navigate('PreviewBookPage', {bookId, bookId})}}>
                        {/* icon here */}
                        <Icon name="arrow-back-ios" size={28} color="#9B3434"  />
                    </TouchableOpacity>
                    <Text className="text-[18px] font-bold text-[#9B3434] pl-6">
                        Payment Details
                    </Text>
                </View>
                <View className="w-full h-auto flex flex-col mt-12">
                    <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                        Payment Method
                    </Text>
                    <View className="border-[1.5px] border-[#9B3434] rounded-custom">
                        <Picker
                            selectedValue={method}
                            onValueChange={(itemValue, itemIndex) =>
                                setMethod(itemValue)
                            }>
                            <Picker.Item label="Select " value="paypal" />
                            <Picker.Item label="Stripe" value="stripe" />
                            <Picker.Item label="PayHere" value="pay here" />
                            <Picker.Item label="Credit Card" value="credit card" />
                        </Picker>
                    </View>
                </View>
                {/* <View className="w-full h-auto flex flex-col mt-2">
                    <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                        Telephone Number
                    </Text>
                    <View className="border-[1.5px] border-[#9B3434] rounded-custom">
                        <TextInput
                            placeholder='Enter your phone number'
                            className="w-full h-[50px] rounded-custom bg-white pl-6"
                            value='0770123123'
                        />
                    </View>
                </View> */}
                <View className="h-[1px] w-full bg-[#505050] mt-16 rounded-full"/>
                <View className="w-full h-auto flex flex-row justify-center items-center mt-12">
                    <View className="flex-1 flex flex-col h-auto">
                        <Text className="text-[14px] font-semibold text-[#545454] mb-4">
                            Subtotal
                        </Text>
                        <Text className="text-[18px] font-bold text-black">
                            Total
                        </Text>
                    </View>
                    <View className="flex-1 flex flex-col h-auto items-end">
                        <Text className="text-[14px] font-semibold text-[#545454] mb-4">
                            {price+'/='}
                        </Text>
                        <Text className="text-[18px] font-bold text-black">
                            {price+'/='}
                        </Text>
                    </View>
                </View>
                <View className="h-[1px] w-full bg-[#505050] mt-16 rounded-full"/>
                <View className="w-full h-auto flex justify-center items-center mt-12">
                    <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-full" onPress={()=>{handleSubmit()}}>
                            <Text className="text-white text-[18px] text-center font-medium">
                                Checkout
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CheckoutPage