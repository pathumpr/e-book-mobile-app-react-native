import {React, useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'
import Logo from './../assets/images/logo.png'
import HomePng from './../assets/images/home.png'
import Ion from 'react-native-vector-icons/Ionicons'
import BookCard from '../components/BookCard'
import CategoryCard from '../components/CategoryCard'
import axios from 'axios'
import { GET_ALL_BOOKS, GET_CATEGORIES_BOOKS, SEARCH_BOOKS } from '../constants/API'

import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const HomePage = ({route}) => {

    const navigation = useNavigation()
    const BottomTabNavigator = createBottomTabNavigator()

    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    
    const [booksArray, setBooksArray] = useState([])
    const [view, setView] = useState(0)
    const [categoriesArray, setCategoriesArray] = useState([])
    const [viewC, setViewC] = useState(0)
    

    // load data until screen is loading
    useEffect(()=>{
        // console.log('USING USE EFFECT')
        axios.get(GET_ALL_BOOKS)
        .then(response => {
            // console.log(response.data['data'])
            // console.log(response.data['count'])
            if(response.data['count'] > 0){
                setBooksArray(response.data['data'])
                setCategoriesArray(response.data['data_c'])
            }else{
                console.log('No books')
                setView(1)
                setViewC(1)
            }
        })
        .catch(error => {
            console.error(error.response.data)
        })
    },[])

    const getCategoryItems = (id)=>{
        setQuery('')
        setView(0)
        setBooksArray([])
        // console.log(id)
        axios.get(GET_CATEGORIES_BOOKS + id) 
        .then(response => {
            // console.log(response.data['data'])
            // console.log(response.data['count'])
            if(response.data['count'] > 0){
                setBooksArray(response.data['data'])
            }else{
                console.log('No books')
                setView(1)
            }
        })
        .catch(error => {
            console.error(error.response.data)
        })
    }

    const getAllItems = ()=>{
        setView(0)
        setQuery('')
        setBooksArray([])
        axios.get(GET_ALL_BOOKS)
        .then(response => {
            // console.log(response.data['data'])
            // console.log(response.data['count'])
            if(response.data['count'] > 0){
                setBooksArray(response.data['data'])
            }else{
                console.log('No books')
                setView(1)
            }
        })
        .catch(error => {
            console.error(error.response.data)
        })
    }

    const handleSearch = async (text) => {
        setQuery(text);
        try {
         await axios.post(SEARCH_BOOKS, {
            text
         })
            .then(response => {
                // console.log(response.data['data'])
                // console.log(response.data['count'])
                if(response.data['count'] > 0){
                    setBooksArray(response.data['data'])
                    // setBooks('Hello');
                    // console.log(books)
                }else{
                    console.log('No books')
                    setView(1)
                }
            })
            .catch(error => {
                console.error(error.response.data)
            })
            
        } catch (error) {
            console.error('Error fetching book data:', error);
            setBooks([]);
        }
    };

    //testing
    // const [dataFromChild, setDataFromChild] = useState(null);

    // const handleDataFromChild = (data) => {
    //   setDataFromChild(data);
    // };
    // end testing

  return (
    // <KeyboardAvoidingView className="flex" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <SafeAreaView>
        <ScrollView className="flex flex-col w-full">
            <View className="w-full h-[230px] bg-[#FFC076] relative flex flex-col justify-center items-center ">
                <Image
                    source={HomePng}
                    className="w-full h-[230px] overflow-hidden absolute object-cover"
                />
                <Image
                    source={Logo}
                    className="w-52 h-24 mb-6"
                />
                <View className=" w-auto h-[45px] flex flex-row rounded-custom bg-white overflow-hidden shadow-lg">
                    <TextInput
                        placeholder='Search Books'
                        placeholderTextColor="#505050"
                        className="w-[230px] h-[45px]  pl-6"
                        onChangeText={handleSearch}
                        value={query}
                    />
                    <TouchableOpacity className="w-[50px] h-full bg-[#9B3434] justify-center items-center flex">
                        <Ion name="search" size={18} color="#fff"  />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="w-full h-auto flex flex-col pt-6 px-6">
                <Text className="text-[18px] font-bold text-[#9B3434]">
                    Categories
                </Text>
                {/* {dataFromChild && <Text>Received data from child: {dataFromChild}</Text>} */}
                <ScrollView horizontal={true} className="mt-4">

                <TouchableOpacity className="w-auto h-[50px] border-[1.5px] border-[#9B3434] px-3 rounded-custom flex justify-center items-center mr-3" onPress={()=>{getAllItems()}}>
                    <Text className="text-[14px] font-medium text-[#9B3434]">
                        Home
                    </Text>
                </TouchableOpacity>
                    
                {
                    viewC == 0
                    ?
                    categoriesArray.map((item, index) => (
                        <TouchableOpacity className="w-auto h-[50px] border-[1.5px] border-[#9B3434] px-3 rounded-custom flex justify-center items-center mr-3" key={index} onPress={()=>{getCategoryItems(item.name)}}>
                            <Text className="text-[14px] font-medium text-[#9B3434]">
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                    :
                    <View className="w-full h-[100px] flex px-6 justify-center items-center">
                        <Text className="text-[18px] font-bold text-[#A8A3A7]">
                            No Categories available
                        </Text>
                    </View>
                }
                </ScrollView>
            </View>
            <View className="w-full h-auto pt-12 px-6 flex flex-row flex-wrap justify-between">
                { 
                    view == 0
                    ?
                    booksArray.map((book, index) => (
                        <BookCard key={index}
                            mkey={book.book_id}
                            bookName={book.name}
                            price={book.price}
                            writer={book.writer}
                            photo={book.photo}
                        />
                    ))
                    :
                    <View className="w-full h-[300px] flex px-6 justify-center items-center">
                        <Text className="text-[18px] font-bold text-[#A8A3A7]">
                            No books available
                        </Text>
                    </View>
                }
            </View>
        </ScrollView>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  )
}

export default HomePage