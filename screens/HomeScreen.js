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
import * as Location from 'expo-location';


export default function HomeScreen({ navigation }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [uid, setUid] = useState("");

  const auth = firebase.auth();
  const user = auth.currentUser;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      var json = JSON.stringify(location);
      var parsed = JSON.parse(json)
      var latitude = parsed.coords.latitude
      var longitude = parsed.coords.longitude
      setLatitude(latitude)
      setLongitude(longitude)
    })();
  }, []);
  

  const [name, setName] = useState("");

  if (user) {
    var currentEmail = user.email
    var currentUid = user.uid

  }
  useEffect(() => {
    setUid(currentUid);
  }, [currentUid]);

  const userRef = firebase.firestore().collection('users')
  useEffect(() => {
    userRef
      .where("email", "==", currentEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var userName = documentSnapshot.data().name
          var documentId = documentSnapshot.id
          setName(userName)

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "text/plain");

          var raw = "{\n    \"fields\": {\n        \"uid\": {\n            \"stringValue\": \""+uid+"\"\n        },\n        \"location\": {\n            \"geoPointValue\": {\n                \"latitude\": "+latitude+",\n                \"longitude\": "+longitude+"\n            }\n        }\n    }\n}";

          var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/"+documentId+"?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=uid&updateMask.fieldPaths=location", requestOptions)
            .then(response => response.text())
          //   .then(result => console.log(result))
            .catch(error => console.log('error', error));
          // console.log('Name: ', name);
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
          <Text style={styles.head}>{name}</Text>
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


