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
import { ADD_BOOK_API, ADD_BOOK_IMAGE_API, ADD_BOOK_FILE_API, GET_CATEGORIES} from '../constants/API'

import { useNavigation } from '@react-navigation/native'

const AddNewBook = () => {

    const navigation = useNavigation()

    const [bookName, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [checkBoxValue, setCheckBoxValue] = useState(false); 
    const [category, setCategory] = useState(null)
    const [checked, setChecked] = useState(false)
    const [file, setFile] = useState('n')
    const [fileName, setFileName] = useState('n')
    const [fileType, setFileType] = useState('n')
    const [profilePicUri, setProfilePicUri] = useState('n')
    const [photo, setPhoto] = useState()
    const [categories, setCategories] = useState([])

    // load data until screen is loading
    useEffect(()=>{
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
    },[])

    const openGallery = async () =>{
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
          }).then(image => {
            setProfilePicUri(image.path);
            setPhoto(image.path);
          });
    }


    const selectDocument = async () => {
        try {
          const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.pdf],
          });
          console.log('Selected document:', res['uri']);
          setFile(res['uri'])
          setFileName(res['name'])
          setFileType(res['type'])
          // Do something with the selected document
        } catch (error) {
          console.log('Error picking document:', error);
        }
    };

    const handleCheck = () => {
        if(checked == true){
            setPrice(0)
            if (!photo || !bookName || !category || !description || !file) {
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
                return
            }else {
                uploadData()
            }
        }else{
            if (!photo || !bookName || !category || !description || !file || !price) {
                Toast.show({
                    title: 'Some required fields are empty!',
                    text: 'Fill all fields to continue',
                    backgroundColor: '#E04B4B',
                    timeColor: '#A8A3A7',
                    timing: 3000,
                    icon: <Icon name={'done'} color={'#fff'} size={28}/>,
                    position: 'top',
                    statusBarType:'dark-content',
                })
                return
            }else {
                uploadData()
            }
        }
    }

    const uploadData = ()=>{
        axios.post(ADD_BOOK_API,
        {
            bookName,
            globalUsername,
            globalId,
            description,
            category,
            price,
        },
        )
        .then(response => {
            global.globalBookId = response.data['bookId']
            if(response.data['msg'] == "success"){
                profilePhotoUpload()
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
            uri: Platform.OS === 'android' ? photo : photo.replace('file:///', ''),     
        });
        data.append('title', 'profile_photo');
        data.append('id', globalBookId); 

        fetch(ADD_BOOK_IMAGE_API, {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(response => {
            if(response['msg'] == 'success'){
                filePhotoUpload()
            }else{
                console.log('Error when saving profile picture')
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    const filePhotoUpload = ()=>{

        const data = new FormData();
        data.append('document', {
            name: fileName,
            type: fileType,
            uri: Platform.OS === 'android' ? file : file.replace('content://', ''),     
        });
        data.append('title', 'book_doc');
        data.append('id', globalBookId); 

        fetch(ADD_BOOK_FILE_API, {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(response => {
            console.log(response['msg'])
            if(response['msg'] == 'success'){
                redirect()
            }else{
                console.log('Error when saving file')
            }   
        })
        .catch(error => {
            console.error(error);
        });
    }

    const redirect = ()=>{
        Toast.show({
            title: 'Book published successfully!',
            text: 'You are successfully published your book.',
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
                                    {profilePicUri == 'n' ? <Ion name="book" size={55} color="#fff"  /> : <Image source={{uri:photo}} className="w-[100px] h-[100px] rounded-custom overflow-hidden"/> }
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
                                <View className="w-full h-auto flex flex-row justify-start items-center mt-8 mb-2">
                                    <CheckBox
                                        style={{flex: 1}}
                                        checkBoxColor={'#9B3434'}
                                        onClick={()=>{
                                            setChecked(!checked)
                                            setPrice(0)
                                        }}
                                        isChecked={checked}
                                        rightText={'Free Book'}
                                        rightTextStyle={{fontSize: 14, color: '#9B3434', fontWeight: 'bold'}}
                                    />
                                </View>
                                {/* Price */}
                                {
                                    !checked ?                         
                                    <>
                                        <Text className="text-[14px] font-bold text-[#505050] mt-6 mb-2">
                                            Price
                                        </Text>
                                        <TextInput
                                            placeholder='Enter the book price'
                                            placeholderTextColor="#505050"
                                            keyboardType='numeric'
                                            value={price}
                                            onChangeText={(text) => setPrice(text)} 
                                            className="w-full h-[45px] border-[1.5px] text-[#505050] border-black rounded-custom bg-white pl-6"
                                        />
                                    </> : <></>
                                }
      
                                <View className="w-full h-auto flex flex-col justify-center items-center mt-8">
                                    {/* Profile pic */}
                                    <TouchableOpacity className={`w-full h-[150px] rounded-custom border-[1.5px] ${fileName == 'n' ? "border-[#9B3434]" : "border-[#13AB3E]"} justify-center items-center`} onPress={selectDocument}>
                                        {file == 'n'? <Ion name="document" size={95} color="#9B3434"/> : <Ion name="document" size={95} color="#13AB3E"/>}
                                    </TouchableOpacity>
                                    <Text className={`text-[18px] font-semibold ${fileName == 'n' ? "text-[#505050]" : "text-[#13AB3E]"} mt-6 mb-2`}>
                                        {fileName == 'n' ? <>Upload the document</> : fileName }
                                    </Text>
                                </View>
                                <TouchableOpacity className="w-full h-[45px] bg-[#9B3434] flex justify-center items-center rounded-custom my-12" onPress={handleCheck}>
                                    <Text className="text-white text-[18px] text-center font-medium">
                                        Publish
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

export default AddNewBook