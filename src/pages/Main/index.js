import React, { useEffect, useState } from 'react';

import { StyleSheet, PermissionsAndroid, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

export default function Main({ navigation }) {

  const [currentRegion, setCurrentRegion] = useState(null);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DevRadarAPP Location Permission',
          message:
            'DevRadar App needs access to your camera ' +
            'so you can render our map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;

      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    async function loadInitialPosition() {
      if (requestCameraPermission())
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCurrentRegion({ latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 });
          },
          error => {

          },
          {
            enableHighAccuracy: true
          });
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion)
    return null;

  return (
    <MapView
      showsUserLocation
      showsMyLocationButton
      style={styles.map}
      initialRegion={currentRegion}
    >
      {currentRegion &&
        <Marker coordinate={currentRegion}>
          <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/34848657?s=460&v=4' }} />

          <Callout onPress={() => {
            navigation.navigate('Profile', {
              github_username: 'mateuschaves'
            });
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Mateus Henrique</Text>
              <Text style={styles.devBio}>Estudante de Sistemas de Informação, desenvolvedor em um projeto da Polícia Civil e simpatizante de programação orientada a ilusões</Text>
              <Text style={styles.devTechs}>React Native, ReactJS, Node.js</Text>
            </View>
          </Callout>
        </Marker>}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    fontSize: 16,
    marginTop: 5

  },
  devTechs: {
    marginTop: 5
  }
});
