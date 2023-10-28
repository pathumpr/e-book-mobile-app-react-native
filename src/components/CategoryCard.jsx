import {React, useState} from 'react'
import { Text, TouchableOpacity} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const CategoryCard = ({title, id,}) => {

  const navigation = useNavigation()
  const BottomTabNavigator = createBottomTabNavigator()

  //testing
  // const [dataToSend, setDataToSend] = useState('');

  // const sendDataToParent = () => {
  //   onDataReceived(dataToSend);
  // };
  //end testing
  
  const getCategoryItems = (id)=>{

  }



  return (
    <TouchableOpacity className="w-auto h-[50px] border-[1.5px] border-[#9B3434] px-3 rounded-custom flex justify-center items-center mr-3" onPress={()=>{getCategoryItems(id)}}>
        <Text className="text-[14px] font-medium text-[#9B3434]">
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard