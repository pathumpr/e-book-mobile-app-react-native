import {React, useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Alert,} from 'react-native'
import ReaderBackground from './../assets/images/background2.png'
import WriterBackground from './../assets/images/background3.png'
import Logo from './../assets/images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ion from 'react-native-vector-icons/Ionicons'
import CheckBox from 'react-native-check-box'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Toast } from 'react-native-popup-confirm-toast'

import { WRITER_LOGIN_API, READER_LOGIN_API, RESOURCE_URL } from '../constants/API'

import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const LoginPage = ({ route }) => {

    const navigation = useNavigation()
    const BottomTabNavigator = createBottomTabNavigator()

    // User Type - 0 = Reader
    // User Type - 1 = Writer
    const { userType } = route.params
    console.log("Login ", userType)

    let loginURL = 'n'
    if(userType == 0){
        loginURL = READER_LOGIN_API
    }
    else if(userType == 1){
        loginURL = WRITER_LOGIN_API
    }

    // Variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false)

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };
    
    const handleLogin = () => {
        if (!validateEmail(email)) {
            Toast.show({
                title: 'Please enter a valid email address!',
                text: 'Try again',
                backgroundColor: '#E04B4B',
                timeColor: '#A8A3A7',
                timing: 3000,
                icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                position: 'top',
                statusBarType:'dark-content',
            })
            return;
        }else if(!password){
            Toast.show({
                title: 'Please provide your password!',
                text: 'Try again',
                backgroundColor: '#E04B4B',
                timeColor: '#A8A3A7',
                timing: 3000,
                icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                position: 'top',
                statusBarType:'dark-content',
            })
            return;
        }

        check()

        // Reset the email and password fields after login attempt
        setEmail('');
        setPassword('');
    };

    const check = ()=>{
        axios.post(loginURL,
        {
            email,
            password,
        },
        )
        .then(response => {
            if(response.data['msg'] == 'not_found'){
                Toast.show({
                    title: 'User not found or inactive',
                    text: 'Try different email or register',
                    backgroundColor: '#E04B4B',
                    timeColor: '#A8A3A7',
                    timing: 3000,
                    icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                    position: 'top',
                    statusBarType:'dark-content',
                })
                return;
            }else if(response.data['msg'] == 'invalid'){
                Toast.show({
                    title: 'Invalid credentials',
                    text: 'Check your email and password',
                    backgroundColor: '#E04B4B',
                    timeColor: '#A8A3A7',
                    timing: 3000,
                    icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                    position: 'top',
                    statusBarType:'dark-content',
                })
                return;
            }
            else if(response.data['msg'] == "success"){

                //set global variables
                global.globalId = response.data["id"]
                global.globalUsername = response.data["username"]
                if(response.data["profilePic"] == 'n'){
                    global.globalPic = 'n'
                }else{
                    global.globalPic = RESOURCE_URL + response.data["profilePic"]
                }
                redirect()
            }else{
                console.log('Not success')
            }
        })
        .catch(error => {
            console.error(error.response.data)
        });
    }

    const redirect = ()=>{

        saveUserDataToAsyncStorage()

        Toast.show({
            title: 'Login successful!',
            text: 'You are successfully Logged In.',
            backgroundColor: '#13AB3E',
            timeColor: '#A8A3A7',
            timing: 3000,
            icon: <Icon name={'done'} color={'#fff'} size={28}/>,
            position: 'top',
            statusBarType:'dark-content',
        })

        if(userType == 0){
            navigation.navigate('MainNavigation', { screen: 'HomePage' })
        }else{
            navigation.navigate('ProfilePage')
        }
    }
        
    const saveUserDataToAsyncStorage = () => {
        //set Async variables
        AsyncStorage.setItem('id', globalId.toString())
        AsyncStorage.setItem('username', globalUsername)
        AsyncStorage.setItem('profilePic', globalPic)
        AsyncStorage.setItem('userType', userType.toString())
    }

  return (
    <SafeAreaView>
            <View className="w-full h-full relative">
                <Image
                    source={userType == 0 ? ReaderBackground : WriterBackground}
                    className="w-full h-full absolute"
                />
                <ScrollView>
                    <View className="w-full h-auto px-6">
                        {/* Section 1 */}
                        <View className="w-full h-auto flex flex-col">
                            <View className="w-full h-auto flex flex-row pt-6 justify-between">
                                <TouchableOpacity className="w-[45px] h-[45px]  rounded-custom border-[1.5px] border-black flex justify-center items-end" onPress={()=>{navigation.navigate('LandingPage')}}>
                                    <Icon name="arrow-back-ios" size={28} color="#000000"  />
                                </TouchableOpacity>
                                <Image
                                    source={Logo}
                                    className="w-52 h-24"
                                />
                            </View>
                            <Text className="text-[24px] font-bold text-black mt-6 px-6">
                                Welcome back!
                            </Text>
                            <Text className="text-[14px] font-medium text-[#505050] mt-1 px-6">
                                Login to continue
                            </Text>
                        </View>
                        {/* Section 2 */}
                        <View className="w-full h-auto flex flex-col px-6 mt-6">
                            {/* Email */}
                            <View className="w-full h-auto flex flex-col">
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                   Email
                                </Text>
                                <TextInput
                                    placeholder='Enter your email'
                                    placeholderTextColor="#505050"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)} 
                                    className="w-full h-[45px] border-[1.5px] text-[#505050] border-black rounded-custom bg-white pl-6"
                                />
                            </View>
                            {/* Password */}
                            <View className="w-full h-auto flex flex-col">
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                   Password
                                </Text>
                                <TextInput
                                    placeholder='Enter your password'
                                    placeholderTextColor="#505050"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    className="w-full h-[45px] border-[1.5px] text-[#505050] border-black rounded-custom bg-white pl-6"
                                />
                                <View className="w-full h-auto flex flex-row justify-start items-center mt-4">
                                    <CheckBox
                                        style={{flex: 1, padding: 10,}}
                                        onClick={()=>{
                                        setChecked(!checked)
                                        }}
                                        isChecked={checked}
                                        rightText={'Remember me'}
                                        rightTextStyle={{fontSize: 14, color: '#505050'}}
                                    />
                                </View>
                                <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-custom mt-6" onPress={handleLogin}>
                                    <Text className="text-white text-[18px] text-center font-medium">
                                    Login
                                    </Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity>
                                    <View className="w-full h-auto flex justify-center items-center">
                                        <Text className="text-[14px] font-normal text-[#505050] mt-6 mb-2">
                                        Forgot Password?
                                        </Text>
                                    </View>
                                </TouchableOpacity> */}
                                {/* <View className="w-full h-auto flex flex-row justify-between items-center mt-6">
                                    <View className="h-[1.5px] w-1/4 bg-[#505050]"/>
                                    <Text className="text-[14px] font-medium text-[#505050]">
                                        Or login with
                                    </Text>
                                    <View className="h-[1.5px] w-1/4 bg-[#505050]"/>
                                </View>
                                <TouchableOpacity className="w-full h-[45px] bg-[#3B10B7C9] justify-center items-center rounded-custom mt-6 ga flex flex-row">
                                    <Ion name="logo-google" size={30} color="#9B3434"/>
                                    <Text className="text-white text-[18px] text-center font-normal ml-4">
                                    Continue with Google
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-full h-[45px] bg-[#3B10B7C9] justify-center items-center rounded-custom mt-6 flex flex-row">
                                    <Ion name="logo-facebook" size={30} color="#9B3434"  className=""/>
                                    <Text className="text-white text-[18px] text-center font-normal ml-4">
                                    Continue with Facebook
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-full h-[45px] bg-[#3B10B7C9] justify-center items-center rounded-custom mt-6 flex flex-row">
                                    <Ion name="logo-twitter" size={30} color="#9B3434"  className=""/>
                                    <Text className="text-white text-[18px] text-center font-normal ml-4">
                                    Continue with Twitter
                                    </Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={()=>{navigation.navigate('RegisterPage', { userType: userType })}}>
                                    <View className="w-full h-auto flex justify-center items-center mt-12 mb-12">
                                        <Text className="text-[14px] font-normal text-[#505050]">
                                            Don't have an account?  <Text className="font-semibold  text-black">Sign Up</Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
    </SafeAreaView>
  )
}

export default LoginPage