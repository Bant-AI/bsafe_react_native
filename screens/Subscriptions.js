import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { user } from '../components/Firebase/firebase';
import IconButton from '../components/IconButton';
import Colors from '../utils/colors';
import firebase from 'firebase';
import Invitation from '../components/Invitation';
import SubscriptionItem from '../components/SubscriptionItem';


export default function Subscriptions({navigation}) {
  const auth = firebase.auth();
  const user = auth.currentUser;
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [subscription, setSubscription] = useState([]);
  const [invitation, setInvitation] = useState([]);

  if (user) {
    var currentId = user.uid;
  }

  useEffect(() => {
    // var requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow'
    // };
    
    // fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/subscriptions?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4", requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     var data = JSON.parse(result)
    //     var documents = JSON.stringify(data.documents[0])
    //     console.log(documents)
    //   })
    setId(currentId);
  }, [currentId]);




    const subsRef = firebase.firestore().collection('subscriptions')
    useEffect(() => { 
      subsRef
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            var data = documentSnapshot.data()
            var sender = data.sender
            var receiver = data.receiver
            var accepted = data.accepted
            if ((receiver == currentId || sender == currentId) && accepted == true) {
              setSubscription([data])
              console.log(subscription)
            } else if (receiver == currentId && accepted == false) {
              setInvitation([data])
              console.log(invitation)
            }
          });
        });
    } 
      , [id])

  



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
        // .then(result => console.log(result))
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
        {/* <TouchableOpacity>
          <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 15 }}>Refresh</Text>
        </TouchableOpacity> */}
      </View>
      {
        invitation.map((item) => {
          return <Invitation sender={item.sender} receiver={item.receiver}></Invitation>
        })
      }
      {
        subscription.map((item) => {
          return <SubscriptionItem sender={item.sender} receiver={item.receiver}></SubscriptionItem>
        })
      }
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