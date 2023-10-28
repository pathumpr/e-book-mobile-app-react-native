import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Root } from 'react-native-popup-confirm-toast'

import LandingPage from './src/screens/LandingPage'
import LoginPage from './src/screens/LoginPage'
import RegisterPage from './src/screens/RegisterPage'
import HomePage from './src/screens/HomePage'
import PreviewBookPage from './src/screens/PreviewBookPage'
import CheckoutPage from './src/screens/CheckoutPage'
import MyUploadsPage from './src/screens/MyUploadsPage'
import ProfilePage from './src/screens/ProfilePage'
import AddNewBook from './src/screens/AddNewBook'
import MyPurchasedPage from './src/screens/MyPurchasedPage'
import MainNavigation from './src/navigation/MainNavigation';
import EditBookPage from './src/screens/EditBookPage';
import ViewPdf from './src/screens/ViewPdf';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Root>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='LandingPage'
          component={LandingPage}
          options={{title:'Landing Page'}}
        />
        <Stack.Screen
          name='LoginPage'
          component={LoginPage}
          options={{title:'LoginPage'}}
        />
        <Stack.Screen
          name='RegisterPage'
          component={RegisterPage}
          options={{title:'RegisterPage'}}
        />
        <Stack.Screen
          name='MainNavigation'
          component={MainNavigation}
          options={{title:'MainNavigation'}}
        />
        <Stack.Screen
          name='HomePage'
          component={HomePage}
          options={{title:'HomePage'}}
        />
        <Stack.Screen
          name='MyPurchasedPage'
          component={MyPurchasedPage}
          options={{title:'MyPurchasedPage'}}
        />
        <Stack.Screen
          name='PreviewBookPage'
          component={PreviewBookPage}
          options={{title:'PreviewBookPage'}}
        />
        <Stack.Screen
          name='CheckoutPage'
          component={CheckoutPage}
          options={{title:'CheckoutPage'}}
        />
        <Stack.Screen
          name='MyUploadsPage'
          component={MyUploadsPage}
          options={{title:'MyUploadsPage'}}
        />
        <Stack.Screen
          name='ProfilePage'
          component={ProfilePage}
          options={{title:'ProfilePage'}}
        />
        <Stack.Screen
          name='AddNewBook'
          component={AddNewBook}
          options={{title:'AddNewBook'}}
        />
        <Stack.Screen
          name='EditBookPage'
          component={EditBookPage}
          options={{title:'EditBookPage'}}
        />
        <Stack.Screen
          name='ViewPdf'
          component={ViewPdf}
          options={{title:'ViewPdf'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Root>
  )
}

export default App