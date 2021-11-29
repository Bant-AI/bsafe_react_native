import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import "firebase/firestore";
import * as firebase from 'firebase';



const Invitation = (props) => {
    const [name, setName] = useState("");
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
        // var documentId = documentSnapshot.id
        setName(userName)
        });
    });
    return (
        <View style={{padding: 15, backgroundColor: 'white'}}>
            <Text style={{ alignSelf: 'left', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 2 }}>{name} wants to follow you</Text>
            <Text style={{ alignSelf: 'left', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 12, padding: 2 }}>ID: {props.sender}</Text>
            <TouchableOpacity>
                <Text style={{ alignSelf: 'left', color: 'white', fontFamily: 'FiraSans_500Medium', fontSize: 15, padding: 5, margin: 4,  backgroundColor: '#1296D4'}}>Accept</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Invitation