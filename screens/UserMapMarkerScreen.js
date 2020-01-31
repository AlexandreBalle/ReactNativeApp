import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';

import VelibContext from '../contexts/velibContext';


const UserMapMarkerScreen = () => {
  const data = useContext(VelibContext);

  useEffect(() => {
    data.getPositionData();
  }, []);

  return (
    <MapView.Marker coordinate={data.currentLocation}>
      <View style={styles.user_marker}></View>
    </MapView.Marker>
  );
}

const styles = StyleSheet.create({
  user_marker: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 18,
    height: 18,
    backgroundColor: "#61dafb",
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 100,
  }
});

export default UserMapMarkerScreen;
