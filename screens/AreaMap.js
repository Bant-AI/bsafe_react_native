import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <MapView.Marker
          coordinate={{ latitude: 14.721941, longitude: 120.999092 }}
          title="My Marker"
          description="Some description"
        />
        <Image
          source={your_custom_image}
          style={your_custom_image_style}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});