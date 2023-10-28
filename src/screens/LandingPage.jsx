import {React, useState, useEffect, useCallback} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, } from 'react-native'
import Background from './../assets/images/background1.png'
import Logo from './../assets/images/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {

  const navigation = useNavigation()

    const [value, setValue] = useState(null)

    // load data until screen is loading
    useFocusEffect(
      useCallback(() => {
        console.log('Landing tab is focused. Screen is reloaded.');
        const getItems = async ()=>{

          let id = await AsyncStorage.getItem('id')
          setValue(id)

          if(id == null){
            console.log('No session')
          }else{
            global.globalId = await AsyncStorage.getItem('id')
            global.globalUsername = await AsyncStorage.getItem('username')
            global.globalPic = await AsyncStorage.getItem('profilePic')
            global.globalUserType = await AsyncStorage.getItem('userType')

            // global.globalId = id
            // global.globalUsername = username
            // global.globalPic = profilePic
            // global.userType = userType
            
            console.log('Async id =',globalId)
            console.log('Username =',globalUsername)
            console.log('Pic =',globalPic)
            console.log('Type =',globalUserType)
            if(globalUserType == 0){
              navigation.navigate('MainNavigation', { screen: 'HomePage' })
            }else{
              navigation.navigate('ProfilePage')
            }
          }
        }
        getItems()
      }, [])
  );

  return (
    <SafeAreaView className="font-inter">
      <View className="w-full h-full bg-white flex flex-col relative">
        <Image
          source={Background}
          className="w-full h-full absolute"
        />
        <View className="w-full flex-1 flex justify-center items-center">
          <Image
            source={Logo}
            className="w-64 h-32"
          />
        </View>
        <View className="w-full flex justify-start items-center flex-1">
          <Text className="text-black text-[32px] text-center font-extrabold">
            Good books makes {'\n'} good day
          </Text>
        </View>
        <View className="w-full flex flex-col justify-center items-center flex-1">
        {
          value == null
          ?
          <>
          <TouchableOpacity className="w-[256px] h-[46px] bg-[#9B3434] flex justify-center items-center rounded-full mb-5" onPress={()=>{navigation.navigate('LoginPage', { userType: 0 })}}>
            <Text className="text-white text-[20px] text-center font-medium">
              Login as a reader
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[256px] h-[46px] bg-white flex justify-center items-center rounded-full" onPress={()=>{navigation.navigate('LoginPage', { userType: 1 })}}>
            <Text className="text-[#DE5000] text-[20px] text-center font-medium">
              Login as a writer
            </Text>
          </TouchableOpacity>
          </>
          :<></>
        }
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LandingPage