import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import PropTypes from'prop-types';

const VelibMapMarkerScreen = ({ velib }) => {
  const coords = {
    latitude: velib.geometry.coordinates[1],
    longitude: velib.geometry.coordinates[0]
  };

  return (
    <MapView.Marker coordinate={coords}>
      <MapView.Callout tooltip style={styles.tooltip_container}>
        <View style={{backgroundColor: '#282c34'}}>
          <Text style={styles.title}>{velib.fields.station_name}</Text>
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
    width: 300,
    height: 100,
  },
  title: {
    color: "#61dafb",
    fontSize: 14,
    paddingLeft: 5,
  },
  description: {
    color: "white",
    fontSize: 12,
    paddingLeft: 5,
  },
});

VelibMapMarkerScreen.propTypes = {
  velib: PropTypes.shape({
    datasetid: PropTypes.string,
    recordid: PropTypes.string,
    fields: PropTypes.shape({
      station_state: PropTypes.string,
      maxbikeoverflow: PropTypes.number,
      densitylevel: PropTypes.string,
      nbbikeoverflow: PropTypes.number,
      dist: PropTypes.string,
      nbedock: PropTypes.number.isRequired,
      station_name: PropTypes.string.isRequired,
      kioskstate: PropTypes.string,
      nbfreeedock: PropTypes.number.isRequired,
      station_type: PropTypes.string,
      station_code: PropTypes.string,
      creditcard: PropTypes.string,
      station: PropTypes.string,
      nbfreedock:PropTypes.number.isRequired,
      duedate: PropTypes.string,
      nbebikeoverflow: PropTypes.number,
      nbebike: PropTypes.number,
      overflow: PropTypes.string,
      nbdock: PropTypes.number.isRequired,
      geo: PropTypes.array,
      overflowactivation: PropTypes.string,
      nbbike: PropTypes.number,
    }),
    geometry: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.array.isRequired
    }),
    record_timestamp: PropTypes.string
  })
};

export default VelibMapMarkerScreen;
