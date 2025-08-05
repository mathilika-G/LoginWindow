import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function GeoPage() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const lastAlertTimeRef = useRef(0); // cooldown tracker

  useEffect(() => {
    lastAlertTimeRef.current = 0; // reset on app start
    let subscriber;

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
        return;
      }

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
        },
        (loc) => {
          setCurrentLocation(loc);

          if (targetLocation) {
            const distance = getDistanceFromLatLonInMeters(
              loc.coords.latitude,
              loc.coords.longitude,
              targetLocation.latitude,
              targetLocation.longitude
            );

            console.log(`Distance to target: ${distance} meters`);

            // Cooldown of 30 seconds before next alert
            if (distance < 100) {
              const now = Date.now();
              if (now - lastAlertTimeRef.current > 3000) { 
                Alert.alert('You are within 100 meters of the target!');
                lastAlertTimeRef.current = now;
              }
            }
          }
        }
      );
    };

    getLocation();

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [targetLocation]);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setTargetLocation(coordinate);
    lastAlertTimeRef.current = 0; // reset cooldown when new target is set
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          region={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          {/* Current location marker */}
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />

          {/* Target marker */}
          {targetLocation && (
            <Marker
              coordinate={targetLocation}
              title="Target Location"
              pinColor="red"
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
