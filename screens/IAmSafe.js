import { View } from 'native-base'
import React from 'react'
import { Text, Image } from 'react-native-elements'
import { View, TouchableOpacity, Alert } from 'react-native'


const injured = () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");

var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Injured\"\n        },\n    },\n}";

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/yLeBxtrmMrBrRbdeHqWY?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=status&updateMask.fieldPaths=radius", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

const critical = () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");

var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Critical\"\n        },\n    },\n}";

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/yLeBxtrmMrBrRbdeHqWY?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=status&updateMask.fieldPaths=radius", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

const safe = () => {
  Alert.alert(
    "Condition Updated",
    "Update successfully sent to your manager. ",
    [
      {
        text: "Okay",
        // onPress: () => Alert.alert("Cancel Pressed"),
        // style: "cancel",
      },
    ],
    // {
    //   cancelable: true,
    //   onDismiss: () =>
    //     Alert.alert(
    //       "This alert was dismissed by tapping outside of the alert dialog."
    //     ),
    // }
  );
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");

var raw = "{\n    \"fields\": {\n        \"status\": {\n            \"stringValue\": \"Safe\"\n        },\n    },\n}";

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://firestore.googleapis.com/v1/projects/bant-ai/databases/(default)/documents/users/yLeBxtrmMrBrRbdeHqWY?key=AIzaSyBL6jwaEBlafkAnQJrCXTNML1di26Dq_q4?currentDocument.exists=true&updateMask.fieldPaths=status&updateMask.fieldPaths=radius", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

export default function IAmSafe( {navigation}) {
    return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <View></View>
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        <>
        <View style={{alignItems: 'center', paddingTop: 30, paddingBottom: 30}}>
            <Image style={{width: 150, height:150}} source={require('../assets/user_icon.png')} />
            <Text style={{alignSelf: 'center', paddingTop: 30, fontSize: 36, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Juan Dela Cruz</Text>
        </View>

        <View style={{alignSelf: 'center'}}>
        <View style={{flexDirection: 'row', alignSelf: 'left'}}>
            <View style={{marginRight: 10}}>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Company</Text>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Office Building</Text>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>City</Text>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Line Manager</Text>
            </View>
            <View style={{marginLeft: 10}}>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Legitimate Company</Text>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Legitimate Tower, Ayala Ave.</Text>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Makati City</Text>
                <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Miguel Alcantara</Text>
          
            </View>
        </View>
        </View>
        <View style={{ width: '80%', alignSelf: 'center', paddingTop: 30, paddingBottom: 30}}>
        <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={{ backgroundColor: 'white', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 },}}>
        <Text style={{alignSelf: 'left', fontSize: 16.68, color: '#1296D4', fontFamily: 'FiraSans_500Medium'}}>Select Work Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={safe}
        style={{ backgroundColor: '#1296D4', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 },}}>
        <Text style={{alignSelf: 'center', fontSize: 16.68, color: 'white', fontFamily: 'FiraSans_500Medium'}}>Safe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {navigation.navigate('Injured'); injured();}}
        style={{ backgroundColor: '#FFB636', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 },}}>
        <Text style={{alignSelf: 'center', fontSize: 16.68, color: 'white', fontFamily: 'FiraSans_500Medium'}}>Injured</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {navigation.navigate('Critical'); critical();}}
        style={{ backgroundColor: '#E21F13', padding: 15, borderRadius: 20, marginTop: 10, marginBottom: 10, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 },}}>
        <Text style={{alignSelf: 'center', fontSize: 16.68, color: 'white', fontFamily: 'FiraSans_500Medium'}}>Critical</Text>
      </TouchableOpacity>
        </View>

        </>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    )
}
