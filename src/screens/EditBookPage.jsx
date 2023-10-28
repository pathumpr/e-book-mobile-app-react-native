import {React, useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, } from 'react-native'
import Logo from './../assets/images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ion from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'
import CheckBox from 'react-native-check-box'
import Background from './../assets/images/background5.png'
import {Picker} from '@react-native-picker/picker'
import DocumentPicker from 'react-native-document-picker'
import axios from 'axios'
import { Toast } from 'react-native-popup-confirm-toast'
import { GET_BOOK_DATA_EDIT, RESOURCE_URL, UPDATE_BOOK_DATA, UPDATE_BOOK_IMAGE, GET_CATEGORIES } from '../constants/API'

import { useNavigation } from '@react-navigation/native'

const EditBookPage = ({ route }) => {

    const { bookId } = route.params
    console.log("Book ID ", bookId)

    const navigation = useNavigation()

    const [bookName, setBookName] = useState('');
    const [description, setDescription] = useState(''); 
    const [category, setCategory] = useState(null)
    const [categories, setCategories] = useState([])

    const [profilePicUri, setProfilePicUri] = useState('n');
    const [isPhotoChanged, setIsPhotoChanged] = useState(0);
    const openGallery = async () =>{
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
          }).then(image => {
            setProfilePicUri(image.path);
            setIsPhotoChanged(1);
          });
    }

    //Get book data
    const [book, setBook] = useState();

    useEffect(()=>{
        console.log('USING USE EFFECT')
        axios.get(GET_BOOK_DATA_EDIT + bookId)
        .then(response => {
            console.log(response.data['data'])
            console.log(RESOURCE_URL + "/" +response.data['data'].photo)
            if(response.data['msg'] == "success"){
                setBookName(response.data['data'].name)
                setDescription(response.data['data'].description)
                setCategory(response.data['data'].category)
                setProfilePicUri( RESOURCE_URL + "/" + response.data['data'].photo)

                // get categories
                axios.get(GET_CATEGORIES)
                .then(response => {
                    // console.log(response.data['data'])
                    // console.log(response.data['count'])
                    if(response.data['count'] > 0){
                        setCategories(response.data['data'])
                    }else{
                        console.log('No Categories')
                    }
                })
                .catch(error => {
                    console.error(error.response.data)
                });
                //end get categories

            }else{
                console.log('No books')
            }
        })
        .catch(error => {
            console.error(error.response.data)
        });
    },[])



    const handleCheck = () => {
        if (!profilePicUri || !bookName || !category || !description) {
            Toast.show({
                title: 'Some required fields are empty!',
                text: 'Fill all fields to continue',
                backgroundColor: '#E04B4B',
                timeColor: '#A8A3A7',
                timing: 3000,
                icon: <Icon name={'warning'} color={'#fff'} size={28}/>,
                position: 'top',
                statusBarType:'dark-content',
            })
        }else {
            console.log('1')
            uploadData()
        }
    }

    const uploadData = ()=>{
        axios.post(UPDATE_BOOK_DATA,
        {
            bookId,
            bookName,
            description,
            category,
        },
        )
        .then(response => {
            if(response.data['msg'] == "success"){
                console.log('2')
                if(isPhotoChanged == 1){
                    profilePhotoUpload()
                }else{
                    redirect()
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
        data.append('id', bookId); 

        fetch(UPDATE_BOOK_IMAGE, {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response['msg'] == 'success'){
                console.log('3')
                redirect()
            }else{
                console.log('Error when updating profile picture')
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    const redirect = ()=>{
        Toast.show({
            title: 'Book updated successfully!',
            text: 'Successfully updated your book.',
            backgroundColor: '#13AB3E',
            timeColor: '#A8A3A7',
            timing: 3000,
            icon: <Icon name={'done'} color={'#fff'} size={28}/>,
            position: 'top',
            statusBarType:'dark-content',
        })
        navigation.navigate('ProfilePage')
    }

  return (
    <SafeAreaView>
            <View className="w-full h-full relative">
                <Image
                    source={Background}
                    className="w-full h-full absolute"
                />
                <ScrollView> 
                    <View className="w-full h-auto px-6">
                        {/* Section 1 */}
                        <View className="w-full h-auto flex flex-col">
                            <View className="w-full h-auto flex flex-row pt-6 justify-between">
                                <TouchableOpacity className="w-[45px] h-[45px]  rounded-custom border-[1.5px] border-[#9B3434] flex justify-center items-end" onPress={()=>{navigation.navigate('ProfilePage')}}>
                                    {/* icon here */}
                                    <Icon name="arrow-back-ios" size={30} color="#9B3434" />
                                </TouchableOpacity>
                                <Image
                                    source={Logo}
                                    className="w-52 h-24"
                                />
                            </View>
                        </View>
                        {/* Section 2 */}
                        <View className="w-full h-auto flex flex-col px-6 mt-12">
                            <View className="w-full h-auto flex flex-col justify-center items-center">
                                {/* Profile pic */}
                                <TouchableOpacity className="w-[100px] h-[100px] rounded-custom bg-[#9B3434] justify-center items-center" onPress={openGallery}>
                                    {profilePicUri == 'n' ? <Ion name="book" size={55} color="#fff"  /> : <Image source={{uri:profilePicUri}} className="w-[100px] h-[100px] rounded-custom overflow-hidden"/> }
                                </TouchableOpacity>
                                <Text className="text-[14px] font-bold text-[#505050] mt-6 mb-2">
                                    Add Book Cover
                                </Text>
                            </View>
                            {/* Book name */}
                            <View className="w-full h-auto flex flex-col">
                                <Text className="text-[14px] font-bold text-[#505050] mt-6 mb-2">
                                   Book name
                                </Text>
                                <TextInput
                                    placeholder='Enter the book name'
                                    placeholderTextColor="#505050"
                                    value={bookName}
                                    onChangeText={(text) => setBookName(text)} 
                                    className="w-full h-[45px] border-[1.5px] text-[#505050] border-black rounded-custom bg-white pl-6"
                                />
                            </View>
                            <View className="w-full h-auto flex flex-col">
                                <Text className="text-[14px] font-bold text-[#505050] mt-6 mb-2">
                                    Select Category
                                </Text>
                                <View className="border-[1.5px] bg-[#ffffff] rounded-custom">
                                    <Picker
                                        selectedValue={category}
                                        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                                    >
                                        {categories == null ? (
                                            <Picker.Item label="1" value="1" />
                                        ) : (
                                            categories.map((item, index) => (
                                                <Picker.Item key={index} label={item.name} value={item.name} />
                                            ))
                                        )}
                                    </Picker>
                                </View>
                            </View>
                            <View className="w-full h-auto flex flex-col">
                                {/* Description */}
                                <Text className="text-[14px] font-bold text-[#505050] mt-6 mb-2">
                                    Description
                                </Text>
                                <TextInput
                                    placeholder='Book description here'
                                    placeholderTextColor="#505050"
                                    multiline={true}
                                    numberOfLines={4}
                                    value={description}
                                    onChangeText={(text) => setDescription(text)} 
                                    className="w-full border-[1.5px] text-[#505050] border-black rounded-custom bg-white px-6"
                                />
                                <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-custom my-12" onPress={handleCheck}>
                                    <Text className="text-white text-[18px] text-center font-medium">
                                        Update
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
    </SafeAreaView>
  )
}

export default EditBookPage