import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import "firebase/firestore";
import * as firebase from 'firebase';


const SubscriptionItem = (props) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    var sender = props.sender;
    const userRef = firebase.firestore().collection('users')
    userRef
    .where("uid", "==", sender)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        var userName = documentSnapshot.data().name
        var status = documentSnapshot.data().status
        // var documentId = documentSnapshot.id
        setName(userName)
        setStatus(status)
        });
    });
    return (
        <View style={{padding: 15, backgroundColor: 'white'}}>
            <Text style={{ alignSelf: 'left', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 2 }}>{name}</Text>
            <Text style={{ alignSelf: 'left', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 12, padding: 2 }}>{status}</Text>
        </View>
    )
}

export default SubscriptionItem