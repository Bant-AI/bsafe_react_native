import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import "firebase/firestore";
import * as firebase from 'firebase';



const Invitation = (props) => {
    const [name, setName] = useState("");
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    useEffect(() => {
    var sender = props.sender;
    var documentId = props.documentId;
    const userRef = firebase.firestore().collection('users')
    userRef
        .where("uid", "==", sender)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                var userName = documentSnapshot.data().name
                setName(userName)
            });
        });

    }, []);

    function handleAccept() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var raw = "{\n    \"fields\": {\n        \"accepted\": {\n            \"booleanValue\": true\n        },\n    },\n}";

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/subscriptions/"+documentId+"?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=accepted", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{ padding: 15, backgroundColor: 'white' }}>
            <Text style={{  color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 2 }}>{name} wants to follow you</Text>
            <Text style={{  color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 12, padding: 2 }}>ID: {props.sender}</Text>
            <TouchableOpacity onPress={handleAccept}>
                <Text style={{  color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 15, padding: 5, margin: 4}}>Accept</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Invitation