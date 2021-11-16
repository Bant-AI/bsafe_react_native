import { View } from 'native-base'
import { Text, Image } from 'react-native'
import React from 'react'

export default function Critical() {
    return (
        <>
        <View style={{alignItems: 'center', paddingTop: 30}}>
            <Image style={{width: 150, height:150}} source={require('../assets/red_user.png')} />
            <Text style={{alignSelf: 'center', paddingTop: 30, fontSize: 36, color: '#E50000', fontFamily: 'FiraSans_500Medium'}}>Critical</Text>
        </View>
                <View>
                <Image style={{width: 45, height:45, alignSelf: 'center', marginTop: 30}} source={require('../assets/alert.png')} />
                <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15, color: '#E50000', fontFamily: 'FiraSans_500Medium'}}>Response team alerted</Text>
                <Image style={{width: 28, height:45, alignSelf: 'center', marginTop: 30}} source={require('../assets/mark_red.png')} />
                <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15, color: '#E50000', fontFamily: 'FiraSans_500Medium'}}>Location sent to response team</Text>
                <Image style={{width: 45, height:45, alignSelf: 'center', marginTop: 30}} source={require('../assets/send_red.png')} />
                <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 15, color: '#E50000', fontFamily: 'FiraSans_500Medium'}}>Update sent to manager</Text>
                <Image style={{width: 54, height:50, alignSelf: 'center', marginTop: 30}} source={require('../assets/beacon.png')} />
                <Text style={{alignSelf: 'center', opacity:0.5, fontSize: 18, marginTop: 15, color: '#E50000', fontFamily: 'FiraSans_500Medium'}}>Touch to send beacon</Text>
            </View>
            </>
    )
}
