import React, { useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default App = () => {
  const [coordinates, setCoordinates] = useState();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      var json = JSON.stringify(location);
      var parsed = JSON.parse(json)
      var latitude = parsed.coords.latitude
      var longitude = parsed.coords.longitude
      setCoordinates({ "latitude": latitude, "longitude": longitude })
      console.log(coordinates)
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={coordinates}
      >
        <Marker coordinate={coordinates} title='Marker' />
     
        </MapView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});