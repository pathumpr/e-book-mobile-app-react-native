import {React, useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, FlatList, } from 'react-native'
import Logo from './../assets/images/logo.png'
import HomePng from './../assets/images/background4.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import MyUploadsCard from '../components/MyUploadsCard';
import { Popup, Toast } from 'react-native-popup-confirm-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DELETE_READER } from '../constants/API'
import axios from 'axios'

import { useNavigation } from '@react-navigation/native'

const ReaderProfilePage = ({ route }) => {

    const navigation = useNavigation()

        //Delete user
        const deleteUser = ()=>{
            Popup.show({
                type: 'confirm',
                title: 'Delete',
                textBody: 'Are you sure to want to delete your account permanently?',
                buttonText: 'Delete Account',
                confirmText: 'Cancel',
                okButtonStyle:  {backgroundColor: '#E04B4B'},
                callback: () => {
                    Popup.hide();
                    deleteRequestToApi()
                },
                cancelCallback: () => {
                    Popup.hide();
                },
            })
        }
        const deleteRequestToApi = ()=>{
            axios.get(DELETE_READER + globalId)
            .then(response => {
                console.log(response.data['msg'])
                if(response.data['msg'] == 'success'){
                    console.log('deleted')
                    clearAsync("Account deleted successfully!", "Your account has been deleted.")
                }else{
                    console.log('Not deleted => Error')
                }
            })
            .catch(error => {
                console.error(error.response.data)
            });
        }

        //Logout user
        const logout = async ()=>{
            Popup.show({
                type: 'confirm',
                title: 'Logout',
                textBody: 'Are you sure to want to logout?',
                buttonText: 'Log Out',
                confirmText: 'Cancel',
                okButtonStyle:  {backgroundColor: '#9B3434'},
                callback: () => {
                    Popup.hide();
                    clearAsync("Logged out successfully!", "You are successfully logged out.")
                },
                cancelCallback: () => {
                    Popup.hide();
                },
            })
        }

        // Common functions
        const clearAsync = async(a, b)=>{
            Toast.show({
                title: a,
                text: b,
                backgroundColor: '#13AB3E',
                timeColor: '#A8A3A7',
                timing: 3000,
                icon: <Icon name={'done'} color={'#fff'} size={28}/>,
                position: 'top',
                statusBarType:'dark-content',
            })
            try {
                await AsyncStorage.clear();
                console.log('AsyncStorage has been cleared successfully.')
                clearGlobals()
            } catch (error) {
                console.error('Error clearing AsyncStorage:', error)
            }
        }
        const clearGlobals = ()=>{
            global.globalId = null
            global.globalUsername = null
            global.globalPic = null
            console.log('Globals has been cleared successfully.')
            redirect()
        }
        const redirect = ()=>{
            navigation.navigate('LandingPage')
        }

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
            <View className="w-full h-auto flex flex-col pt-6 px-6 mb-12">
                <Text className="text-[18px] font-bold text-[#9B3434]">
                    My Profile
                </Text>
                <Text className="text-[14px] font-medium text-[#505050] mt-1">
                    {globalUsername}  •  <Text className='text-[#13AB3E]'>Reader</Text> 
                </Text>
            </View>
            <View className="w-full h-full px-6 py-0 flex flex-col">
                <TouchableOpacity className="w-full h-[66px] border-[1.5px] border-[#9B3434] rounded-custom flex flex-row justify-between items-center mb-6" onPress={()=>{deleteUser()}}>
                    <Text className="text-[18px] font-medium text-[#9B3434] pl-6">
                        Delete Account
                    </Text>
                    <View className="mr-6">
                        <Icon name="arrow-forward-ios" size={28} color="#9B3434" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="w-full h-[66px] border-[1.5px] border-[#9B3434] rounded-custom flex flex-row justify-between items-center mb-6" onPress={()=>{logout()}}>
                    <Text className="text-[18px] font-medium text-[#9B3434] pl-6">
                        Log Out
                    </Text>
                    <View className="mr-6">
                        <Icon name="arrow-forward-ios" size={28} color="#9B3434" />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ReaderProfilePage