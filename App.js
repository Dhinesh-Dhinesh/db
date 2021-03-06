import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import HomeScreen from './screen/home';
import New from './screen/new';
import Delete from './screen/delete';
import UploadImager from './screen/image';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateUser" component={New} />
        <Stack.Screen name="DeletePage" component={Delete} />
        <Stack.Screen name="UploadImage" component={UploadImager} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}