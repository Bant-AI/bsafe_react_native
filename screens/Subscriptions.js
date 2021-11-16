import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { user } from '../components/Firebase/firebase';


export default function Subscriptions() {
    const [id, setId] = useState("");
    const [code, setCode] = useState("");
    
    if (user) {
        var currentId = user.uid;
        console.log(currentId)
    }

    useEffect(() => {
        setId(currentId);
    }, [currentId]);

    
    return (
        <>
        <View>
        <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium', marginVertical: 30, fontSize: 19, backgroundColor: 'white', padding: 15}}>{id}</Text>

        <TextInput
        placeholder="Paste a BSafe user code here"
        onChangeText={(code) => setCode(code)}
        defaultValue={code}
        style={{ height: 40, marginHorizontal: 60, padding: 10, shadowOffset: { width: 0, height: 1 }, shadowColor: 'black', shadowOpacity: 0.5, borderRadius: 10, backgroundColor: 'white' }}
      />
      <TouchableOpacity>
        <Text style={{ alignSelf: 'center', color: '#1296D4', fontFamily: 'FiraSans_500Medium', fontSize: 19, padding: 15}}>Subscribe</Text>
      </TouchableOpacity>
     

        </View>
        </>
    )
}
