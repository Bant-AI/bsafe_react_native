import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {
  useFonts,
  FiraSans_500Medium,
} from '@expo-google-fonts/fira-sans';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} 
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontSize: 23,
            color: 'black',
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium"
          },
        }} />
      {/* <Stack.Screen name="Conference" component={Conference} />
      <Stack.Screen name="Story" component={Story} /> */}
    </Stack.Navigator>
  );
}
