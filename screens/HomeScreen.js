import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { user, logout } from '../components/Firebase/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useFonts,
  FiraSans_500Medium,
} from '@expo-google-fonts/fira-sans';
import AppLoading from 'expo-app-loading';
import "firebase/firestore";
import firebase from 'firebase';



export default function HomeScreen({ navigation }) {

  const [name, setName] = useState("");

  if (user) {
    var currentEmail = user.email
  }

  const userRef = firebase.firestore().collection('users')
  useEffect(() => {
    userRef
        .where("email", "==", currentEmail)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            var userName = documentSnapshot.data().name
            setName(userName)
            console.log('Name: ', name);
          });
        });
  }
  , [])

  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  let [fontsLoaded] = useFonts({
    FiraSans_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <View>
          <Text style={styles.head}>{name} </Text>
        </View>

        <View style={styles.container}>

          <TouchableOpacity onPress={() => navigation.navigate('ReportIncident')}>
            <Image source={require('../assets/reportIncident.png')} />
            <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Report Incident</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('IAmSafe')}>
            <Image source={require('../assets/iamsafe.png')} />
            <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>I am Safe</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('AreaMap')}>
            <Image source={require('../assets/areamap.png')} />
            <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Area Map</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('VideoFeed')}>
            <Image source={require('../assets/videofeed.png')} />
            <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Video Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
            <Image source={require('../assets/videofeed.png')} />
            <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Subscriptions</Text>
          </TouchableOpacity>


        </View>
        <View style={styles.signout}>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center'
  },
  signout: {
    marginVertical: 40
  },
  head: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 31,
    fontWeight: "700",
    alignSelf: "flex-start",
    color: "#1296D4",
    padding: 20,
    marginVertical: 20, 
    marginHorizontal: 30
  },
});


