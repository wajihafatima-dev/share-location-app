import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert, Image } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database'; 
import GOOGLE_MAPS_APIKEY from '../constant';

const customMarkerImage = require('../assets/img.png');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 50, 
    height: 50, 
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MapScreen:React.FC<any>=({navigation})=> {
  const [myCurrentLocation, setMyCurrentLocation] = useState<any>({});
  const [myLocation, setMyLocation] = useState({
    latitude:24.885639527382494, 
    longitude: 67.08999160130348 ,
    // title:'',
    // description:''
  });

  const destination = {
    latitude: 24.93526100543665,
    longitude:  67.0509231488264,
  };

  const saveLocationToFirebase = () => {
    const userId = 'unique_user_id'; 
    database()
      .ref(`/locations/${userId}`)
      .set({
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        timestamp: new Date().toISOString(),
        // title:'Pakistan Maritime Museum',
        // description:'Historical maritime exhibits on the nations navy & a real minesweeper & submarine on the water.'
      })
      .then(() => {
        console.log('Location saved to Firebase successfully!');
        navigation.navigate('ViewLocation')
      })
      .catch((error) => {
        console.error('Error saving location to Firebase: ', error);
      });
  };

  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        console.log(info);
        setMyCurrentLocation ({ ...info.coords }) ;
        const mapInfo={
          latitude: myLocation.latitude, 
          longitude: myLocation.longitude ,
          title:'Pakistan Maritime Museum',
          description:'Historical maritime exhibits on the nations navy & a real minesweeper & submarine on the water.'
        }
        setMyLocation(mapInfo);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const setLocation = (coords:any) => {
    setMyLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      // title:title,
      // description:description
    });
    console.log('New Location set:', coords);
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: myLocation.latitude || 24.914536859243057,
          longitude: myLocation.longitude || 67.05808522441025,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <MapViewDirections
          origin={myLocation}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={30}
          strokeColor="hotpink"
        />
        {myLocation.latitude && myLocation.longitude && (
          <>
            <Circle
              center={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              radius={30}
              fillColor="rgba(255, 0, 0, 0.3)"
              strokeColor="rgba(255, 0, 0, 0.6)"
            />
            <Marker
              onPress={(e) => setLocation(e.nativeEvent.coordinate)}
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,

              }}
              title='Pakistan Maritime Museum'
              description='Historical maritime exhibits on the nations navy & a real minesweeper & submarine on the water.'
            >
              <Image source={customMarkerImage} style={styles.markerImage} />
              {/* <Callout>
                <Text >{myLocation.title}</Text>
                <Text >{myLocation.description}</Text>
              </Callout> */}
            </Marker>
          </>
        )}
      </MapView>
      <Button title="Save Location" onPress={saveLocationToFirebase} />
    </View>
  );
}
export default MapScreen