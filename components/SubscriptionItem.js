import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import "firebase/firestore";
import * as firebase from 'firebase';


const SubscriptionItem = (props) => {
    const auth = firebase.auth();
    const user = auth.currentUser;
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [target, setTarget] = useState("");
    useEffect(() => {
        if (user) {
            var currentUid = user.uid
        }
        var receiver = props.receiver;
        var sender = props.sender;
        if (receiver == currentUid) {
            setTarget(sender)
        } else if (sender == currentUid) {
            setTarget(receiver)
        }
        const userRef = firebase.firestore().collection('users')
        userRef
        .where("uid", "==", target)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
            var userName = documentSnapshot.data().name
            var userStatus = documentSnapshot.data().status
            setName(userName)
            setStatus(userStatus)
            });
        });
    }, []);




    return (
        <View style={{padding: 15, backgroundColor: 'white'}}>
            <Text style={{  color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 2 }}>{name}</Text>
            <Text style={{  color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 12, padding: 2 }}>{status}</Text>
        </View>
    )
}

export default SubscriptionItem