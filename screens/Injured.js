import { View } from 'native-base'
import { Text, Image } from 'react-native'
import React from 'react'

export default function Injured() {
    return (
        <>
        <View style={{alignItems: 'center', paddingTop: 30}}>
            <Image style={{width: 150, height:150}} source={require('../assets/orange_user.png')} />
            <Text style={{alignSelf: 'center', paddingTop: 30, fontSize: 36, color: '#FF8F1F', fontFamily: 'FiraSans_500Medium'}}>Injured</Text>
        </View>
        <View>
            <Image style={{width: 55, height:55, alignSelf: 'center', marginTop: 30}} source={require('../assets/mic.png')} />
            <Text style={{alignSelf: 'center', opacity:0.5, fontSize: 18, marginTop: 15, color: '#FF8F1F', fontFamily: 'FiraSans_500Medium'}}>Details of condition required</Text>
            <Image style={{width: 33, height:33, alignSelf: 'center', marginTop: 30}} source={require('../assets/send.png')} />
            <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15, color: '#FF8F1F', fontFamily: 'FiraSans_500Medium'}}>Messaged emergency contacts </Text>
            <Image style={{width: 37.5, height:37.5, alignSelf: 'center', marginTop: 30}} source={require('../assets/info.png')} />
            <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15, color: '#FF8F1F', fontFamily: 'FiraSans_500Medium'}}>Update sent to manager</Text>
            <Image style={{width: 28.14, height:45, alignSelf: 'center', marginTop: 30}} source={require('../assets/mark.png')} />
            <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15, color: '#FF8F1F', fontFamily: 'FiraSans_500Medium'}}>Location sent to response team</Text>
        </View>
        </>
    )
}
