import {React, useState} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Alert,} from 'react-native'
import Logo from './../assets/images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ion from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'
import { Toast } from 'react-native-popup-confirm-toast'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CREATE_READER_API, CREATE_WRITER_API } from '../constants/API'
import { WRITER_PHOTO_API, READER_PHOTO_API } from '../constants/API'

import { useNavigation } from '@react-navigation/native'

const RegisterPage = ({ route }) => {

    const navigation = useNavigation()

    // User Type - 0 = Reader
    // User Type - 1 = Writer
    const { userType } = route.params
    console.log("Register ", userType)

    // Set Create API URL on userType
    let registerURL = 'n'
    if(userType == 0){
        registerURL = CREATE_READER_API
    }
    else if(userType == 1){
        registerURL = CREATE_WRITER_API
    }
    
    // Set Profile pic upload API URL on userType
    let photoUploadURL = 'n'
    if(userType == 0){
        photoUploadURL = READER_PHOTO_API
    }
    else if(userType == 1){
        photoUploadURL = WRITER_PHOTO_API
    }
    
    //pic profile photo
    const [profilePicUri, setProfilePicUri] = useState('n')
    const [image, setImage] = useState()
    const openGallery = async () =>{
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
        setProfilePicUri(image.path)
        setImage(image.path)
        });
    }

    //Variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Register validation function
    const handleRegister = ()=>{
        // Regular expression for phone number validation
        const phoneRegex = /^\d{10,}$/;
        // Check if any field is empty
        if (!username || !email || !phoneNumber || !password || !confirmPassword) {
            Toast.show({
                title: 'Please fill in all fields.',
                text: 'Fill all fields to continue',
                backgroundColor: '#E04B4B',
                timeColor: '#A8A3A7',
                timing: 3000,
                icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                position: 'top',
                statusBarType:'dark-content',
            })
            return;
        }
        // Check if the username is at least 4 characters
        if (username.length < 4) {
        // Alert.alert('Error', 'Username must be at least 4 characters.');
            Toast.show({
                title: 'Username must be at least 4 characters.',
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
        // Check if the email is valid
        if (!isValidEmail(email)) {
        // Alert.alert('Error', 'Invalid email address.');
            Toast.show({
                title: 'Invalid email address.',
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
        // Check if the phone number is valid
        if (!phoneRegex.test(phoneNumber)) {
        // Alert.alert('Error', 'Invalid phone number.');
            Toast.show({
                title: 'Invalid phone number.',
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
        // Check if the password is at least 6 characters
        if (password.length < 6) {
        // Alert.alert('Error', 'Password must be at least 6 characters.');
            Toast.show({
                title: 'Password must be at least 6 characters.',
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
        // Check if the passwords match
        if (password !== confirmPassword) {
        // Alert.alert('Error', 'Passwords do not match.');
            Toast.show({
                title: 'Passwords do not match.',
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

        //Sending data to API
        upload()

    }
    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const upload = ()=>{
        const status = 1;
        const profilePhoto = 'n'          
        axios.post(registerURL,
        {
            username,
            email,
            phoneNumber,
            status,
            profilePhoto,
            password,
        },
        )
        .then(response => {
            if(response.data['msg'] == 'email_exists'){
                Toast.show({
                    title: 'Email Already Exists',
                    text: 'Try different email or login',
                    backgroundColor: '#E04B4B',
                    timeColor: '#A8A3A7',
                    timing: 3000,
                    icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                    position: 'top',
                    statusBarType:'dark-content',
                })
                return;
            }else if(response.data['msg'] == 'phone_exists'){
                Toast.show({
                    title: 'Phone Number Already Exists',
                    text: 'Try different number or login',
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
                if(profilePicUri == 'n'){
                    redirect()
                }else{
                    global.id = response.data['id'].toString()
                    profilePhotoUpload()
                }
            }else{
                console.log('Not success')
            }
        })
        .catch(error => {
            console.error(error.response.data)
        });
    }

    const profilePhotoUpload = ()=>{

        const data = new FormData();
        data.append('photo', {
            name: 'photo.jpg',
            type: 'image/jpg',
            uri: Platform.OS === 'android' ? profilePicUri : profilePicUri.replace('file://', ''),     
        });
        data.append('title', 'profile_photo');
        data.append('id', id); 

        fetch(photoUploadURL, {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(response => {
            if(response['msg'] == 'success'){
                redirect()
            }else{
                console.log('Error when saving profile picture')
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    const redirect = ()=>{

        saveUserDataToAsyncStorage()

        Toast.show({
            title: 'Registration successful!',
            text: 'You are successfully registered.',
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
        AsyncStorage.setItem('id', id)
        AsyncStorage.setItem('username', username)
        AsyncStorage.setItem('profilePic', profilePicUri)
        AsyncStorage.setItem('userType', userType.toString())

        //set global variables
        global.globalId = id
        global.globalUsername = username
        global.globalPic = profilePicUri
    }

  return (
    <SafeAreaView>
            <View className="w-full h-full">
                <ScrollView>
                    <View className="w-full h-auto px-6">
                        {/* Section 1 */}
                        <View className="w-full h-auto flex flex-col">
                            <View className="w-full h-auto flex flex-row pt-6 justify-between">
                                <TouchableOpacity className="w-[45px] h-[45px]  rounded-custom border-[1.5px] border-black flex justify-center items-end" onPress={()=>{navigation.navigate('LoginPage', {userType: userType})}}>
                                    {/* icon here */}
                                    <Icon name="arrow-back-ios" size={30} color="#000000" />
                                </TouchableOpacity>
                                <Image
                                    source={Logo}
                                    className="w-52 h-24"
                                />
                            </View>
                            <Text className="text-[24px] font-bold text-black mt-6 px-6">
                                Welcome!
                            </Text>
                            <Text className="text-[14px] font-medium text-[#505050] mt-1 px-6">
                                Register to continue
                            </Text>
                        </View>
                        {/* Section 2 */}
                        <View className="w-full h-auto flex flex-col px-6 mt-8">
                            <View className="w-full h-auto flex flex-col justify-center items-center">
                                {/* Profile pic */}
                                <TouchableOpacity className="w-[100px] h-[100px] rounded-full bg-[#9B3434] justify-center items-center" onPress={openGallery}>
                                    {profilePicUri == 'n' ? <Ion name="person" size={55} color="#ffffff"  /> : <Image source={{uri:profilePicUri} } resizeMode='contain' className="w-full h-full rounded-full"/> }
                                </TouchableOpacity>
                                <Text className="text-[14px] font-bold text-[#505050] mt-6 mb-2">
                                    Add profile picture
                                </Text>
                            </View>
                            {/* Username */}
                            <View className="w-full h-auto flex flex-col">
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                   Username
                                </Text>
                                <TextInput
                                    placeholder='Enter your name'
                                    placeholderTextColor="#505050"
                                    autoCapitalize='sentences'
                                    inputMode='text'
                                    keyboardType='default'
                                    maxLength={20}
                                    value={username}
                                    onChangeText={setUsername}
                                    className="w-full h-[45px] border-[1.5px] border-black rounded-custom bg-white pl-6"
                                />
                            </View>
                            <View className="w-full h-auto flex flex-col">
                                {/* Email */}
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                    Email
                                </Text>
                                <TextInput
                                    placeholder='Enter your email'
                                    placeholderTextColor="#505050"
                                    inputMode='email'
                                    keyboardType='email-address'
                                    maxLength={70}
                                    value={email}
                                    onChangeText={setEmail}
                                    className="w-full h-[45px] border-[1.5px] border-black rounded-custom bg-white pl-6"
                                />
                                {/* Phone */}
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                   Phone number
                                </Text>
                                <TextInput
                                    placeholder='Enter your phone number'
                                    placeholderTextColor="#505050"
                                    inputMode='tel'
                                    keyboardType='phone-pad'
                                    maxLength={12}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    className="w-full h-[45px] border-[1.5px] border-black rounded-custom bg-white pl-6"
                                />
                                {/* Password */}
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                    Password
                                </Text>
                                <TextInput
                                    placeholder='Create a password'
                                    placeholderTextColor="#505050"
                                    maxLength={16}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    className="w-full h-[45px] border-[1.5px] border-black rounded-custom bg-white pl-6"
                                />
                                {/* Confirm Password */}
                                <Text className="text-[14px] font-bold text-black mt-6 mb-2">
                                   Confirm Password
                                </Text>
                                <TextInput
                                    placeholder='Confirm Password'
                                    placeholderTextColor="#505050"
                                    maxLength={16}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    className="w-full h-[45px] border-[1.5px] border-black rounded-custom bg-white pl-6"
                                />
                                <Text className="text-[14px] font-normal text-[#505050] mt-6 mb-2 leading-[20px]">
                                    By continuing, you agree to our 
                                    <Text className="text-[#9B3434] font-medium"> Terms Of Service </Text> 
                                    and 
                                    <Text className="text-[#9B3434] font-medium"> Privacy Policy</Text>
                                </Text>
                                <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-custom mt-6" onPress={handleRegister}>
                                    <Text className="text-white text-[18px] text-center font-medium">
                                        Register
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{navigation.navigate('LoginPage', { userType: userType })}}>
                                    <View className="w-full h-auto flex justify-center items-center mt-12 mb-12">
                                        <Text className="text-[14px] font-normal text-[#505050]">
                                            Already have an account?  <Text className="font-semibold  text-black">Login</Text>
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

export default RegisterPage