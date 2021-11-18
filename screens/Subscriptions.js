import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { user } from '../components/Firebase/firebase';
import IconButton from '../components/IconButton';
import Colors from '../utils/colors';
import firebase from 'firebase';


export default function Subscriptions({navigation}) {
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  

  const userRef = firebase.firestore().collection('subscriptions')
  useEffect(() => {
    userRef
      .where("sender", "==", id)
      .where("receiver", "==", id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var userName = documentSnapshot.data().name
          var documentId = documentSnapshot.id
          setName(userName)
        });
      });
  } 
    , [])

  if (user) {
    var currentId = user.uid;
  }

  useEffect(() => {
    setId(currentId);
  }, [currentId]);

  function subscribe(code, id) {
    if (code === id) {
      alert("You cannot subscribe to yourself");
    } else if (code === "") {
      alert("Please enter a code");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");

      var raw = "{  \n    \"fields\": {\n        \"sender\": {\n            \"stringValue\": \""+id+"\"\n        },\n        \"accepted\": {\n            \"booleanValue\": false\n        },\n        \"receiver\": {\n            \"stringValue\": \""+code+"\"\n        }\n    }\n}";

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/subscriptions?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      alert("Subscription code added");
    }
  }



  return (
    <>
      <View>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.primary}
        size={30}
        onPress={() => navigation.goBack()}
      />
        <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium', marginVertical: 30, fontSize: 19, backgroundColor: 'white', padding: 15 }}>{id}</Text>

        <TextInput
          placeholder="Paste a BSafe user code here"
          onChangeText={(code) => setCode(code)}
          defaultValue={code}
          style={{ height: 40, marginHorizontal: 60, padding: 10, shadowOffset: { width: 0, height: 1 }, shadowColor: 'black', shadowOpacity: 0.5, borderRadius: 10, backgroundColor: 'white' }}
        />
        <TouchableOpacity onPress={subscribe}>
          <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 15 }}>Subscribe</Text>
        </TouchableOpacity>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
});