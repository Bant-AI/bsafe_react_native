import React, { useState, useEffect } from 'react'
import { Text, Image } from 'react-native-elements'
import { View, TouchableOpacity, Alert } from 'react-native'
import { user } from '../components/Firebase/firebase';
import firebase from 'firebase';
import * as Location from 'expo-location';


export default function IAmSafe({ navigation }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  if (user) {
    var currentEmail = user.email
  }

  const userReference = firebase.firestore().collection('users')
    userReference
      .where("email", "==", currentEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var photoUrlData = documentSnapshot.data().photoUrl
            setPhotoUrl(photoUrlData)
        });
      })

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

          var raw = "{\n    \"fields\": {\n        \"uid\": {\n            \"stringValue\": \""+currentUid+"\"\n        },\n        \"location\": {\n            \"geoPointValue\": {\n                \"latitude\": "+latitude+",\n                \"longitude\": "+longitude+"\n            }\n        }\n    }\n}";

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


  const [id, setId] = useState("");

  const injured = () => {
    const userRef = firebase.firestore().collection('users')
    userRef
      .where("email", "==", currentEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var docId = documentSnapshot.id
          setId(docId)
        });
      })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Injured\"\n        },\n    },\n}";

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/"+id+"?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=status&updateMask.fieldPaths=radius", requestOptions)
      .then(response => response.text())
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }

  const critical = () => {
    const userRef = firebase.firestore().collection('users')
    userRef
      .where("email", "==", currentEmail)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var docId = documentSnapshot.id
          setId(docId)
        });
      })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Critical\"\n        },\n    },\n}";

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/"+id+"?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=status&updateMask.fieldPaths=radius", requestOptions)
      .then(response => response.text())
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }



  const safe = () => {
    Alert.alert(
      "Condition Updated",
      "Update successfully sent to your manager. ",
      [
        {
          text: "Okay",
        },
      ],
    );
    const userRef = firebase.firestore().collection('users')
      userRef
        .where("email", "==", currentEmail)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            var docId = documentSnapshot.id
            setId(docId)
          });
        })
    
     
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Safe\"\n        },\n    },\n}";

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/"+id+"?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=status&updateMask.fieldPaths=radius", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <>
      <View style={{ alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
        <Image style={{ width: 150, height: 150 }} source={{uri: photoUrl}} />
        <Text style={{ alignSelf: 'center', paddingTop: 30, fontSize: 36, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>{name}</Text>
      </View>

      <View style={{ alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'left' }}>
          <View style={{ marginRight: 10 }}>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Company</Text>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Office Building</Text>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>City</Text>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Line Manager</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Legitimate Company</Text>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Legitimate Tower, Ayala Ave.</Text>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Makati City</Text>
            <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>Miguel Alcantara</Text>

          </View>
        </View>
      </View>
      <View style={{ width: '80%', alignSelf: 'center', paddingTop: 30, paddingBottom: 30 }}>
        <TouchableOpacity
          onPress={() => alert('Hello, world!')}
          style={{ backgroundColor: 'white', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 }, }}>
          <Text style={{ alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium' }}>{latitude}, {longitude}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={safe}
          style={{ backgroundColor: '#1296D4', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 }, }}>
          <Text style={{ alignSelf: 'center', fontSize: 16.68, color: 'white', fontFamily: 'FiraSans_500Medium' }}>Safe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Injured'); injured(); }}
          style={{ backgroundColor: '#FFB636', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 }, }}>
          <Text style={{ alignSelf: 'center', fontSize: 16.68, color: 'white', fontFamily: 'FiraSans_500Medium' }}>Injured</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Critical'); critical(); }}
          style={{ backgroundColor: '#E21F13', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 }, }}>
          <Text style={{ alignSelf: 'center', fontSize: 16.68, color: 'white', fontFamily: 'FiraSans_500Medium' }}>Critical</Text>
        </TouchableOpacity>
      </View>

    </>







  )
}
