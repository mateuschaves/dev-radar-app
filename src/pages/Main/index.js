import React, { useEffect, useState } from 'react';

import { StyleSheet, PermissionsAndroid, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
    <>
      <MapView
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

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar devs por techs...'
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={() => { }} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
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
  },
  searchForm: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
});
