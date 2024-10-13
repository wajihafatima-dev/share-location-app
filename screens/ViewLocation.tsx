// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import MapView, { Marker, Circle, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
// import database from '@react-native-firebase/database';
// import { Text } from 'react-native-elements';

// const customMarkerImage = require('../assets/img.png');

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: '100%',
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   markerImage: {
//     width: 50, 
//     height: 50, 
//   },
// });

// export default function ViewLocation() {
//   const [mapInfo, setMapInfo] = useState({
//     title: '',
//     description: '',
//   });
  
//   const [myLocation, setMyLocation] = useState({
//     latitude: 0, 
//     longitude: 0,
//   });

// //   const fetchLocationFromFirebase = () => {
// //     const userId = 'unique_user_id'; 
// //     database()
// //       .ref(`/locations/${userId}`)
// //       .once('value')
// //       .then(snapshot => {
// //         const location = snapshot.val();
// //         if (location) {
// //           setMyLocation({
// //             latitude: location.latitude,
// //             longitude: location.longitude,
// //           });
// //           setMapInfo({
// //             title: location.title || 'My Location',  // Default title
// //             description: location.description || 'This is the location description',  // Default description
// //           });
// //           console.log('Location fetched from Firebase:', location);
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Error fetching location from Firebase:', error);
// //       });
// //   };

// //   useEffect(() => {
// //     fetchLocationFromFirebase(); 
// //   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         region={{
//           latitude: myLocation.latitude || 24.914536859243057,
//           longitude: myLocation.longitude || 67.05808522441025,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}
//       >
//         {myLocation.latitude && myLocation.longitude && (
//           <>
//             <Circle
//               center={{
//                 latitude: myLocation.latitude,
//                 longitude: myLocation.longitude,
//               }}
//               radius={30}
//               fillColor="rgba(255, 0, 0, 0.3)"
//               strokeColor="rgba(255, 0, 0, 0.6)"
//             />
//           <Marker
//               coordinate={myLocation}
//               title="Destination"
//               description="This is your destination"
//               pinColor="blue"
//             />
//           </>
          
//         )}
//       </MapView>
//     </View>
//   );
// }
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert, Image } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import database from '@react-native-firebase/database'; 
import { useNavigation } from '@react-navigation/native'; 
import GOOGLE_MAPS_APIKEY from '../constant';
import { Text } from 'react-native-elements';

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

const ViewLocation=()=> {
    const [myLocation, setMyLocation] = useState({
            latitude: 0, 
            longitude: 0,
          })
  const destination = {
    latitude: 24.93526100543665,
    longitude:  67.0509231488264,
  };

  const fetchLocationFromFirebase = () => {
        const userId = 'unique_user_id'; 
        database()
          .ref(`/locations/${userId}`)
          .once('value')
          .then(snapshot => {
            const location = snapshot.val();
            if (location) {
              setMyLocation({
                latitude: location.latitude,
                longitude: location.longitude,
              });
            
              console.log('Location fetched from Firebase:', location);
            }
          })
          .catch(error => {
            console.error('Error fetching location from Firebase:', error);
          });
      };
    
      useEffect(() => {
        fetchLocationFromFirebase(); 
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
         <Marker
              coordinate={myLocation}
              title=" Pakistan Maritime Museum"
              description="Historical maritime exhibits on the nations navy & a real minesweeper & submarine on the water."
              pinColor="blue"
            />
      </MapView>
      {/* <Button title="Save Location" onPress={saveLocationToFirebase} /> */}
    </View>
  );
}
export default ViewLocation