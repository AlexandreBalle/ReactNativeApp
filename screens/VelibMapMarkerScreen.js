import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';

const VelibMapMarkerScreen = ({ velib }) => {
  const coords = {
    latitude: velib.geometry.coordinates[1],
    longitude: velib.geometry.coordinates[0]
  };

  return (
    <MapView.Marker coordinate={coords}>
      <MapView.Callout tooltip style={styles.tooltip_container}>
          <View>
              <Text>{velib.fields.station_name}</Text>
              <Text style={styles.description}>
              {
                "Nb de vélo dispo : " + velib.fields.nbfreedock + "/" + velib.fields.nbdock + "\n" +
                "Nb de vélo éléc. dispo : " + velib.fields.nbfreeedock + "/" + velib.fields.nbedock
              }
              </Text>
          </View>
      </MapView.Callout>
    </MapView.Marker>
  );
}

const styles = StyleSheet.create({
  tooltip_container: {
    backgroundColor: "white",
    padding: 5
  },
  description: {
    paddingTop: 5,
    color: "grey",
  }
});

export default VelibMapMarkerScreen;
