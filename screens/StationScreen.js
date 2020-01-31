import React from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import Moment from 'moment';

import VelibMapMarkerScreen from './VelibMapMarkerScreen';
import UserMapMarkerScreen from './UserMapMarkerScreen';

Moment.locale('fr');

const StationScreen = ({ velib }) => {
  const coordinate = velib.geometry.coordinates.length > 0 ? {
    latitude: velib.geometry.coordinates[1],
    longitude: velib.geometry.coordinates[0]
  } : {
    latitude: "",
    longitude: ""
  }
  const distance = parseInt(velib.fields.dist)

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 0.8 }}
        initialRegion={{
         latitude:coordinate.latitude,
         longitude:coordinate.longitude,
         latitudeDelta: 0.01,
         longitudeDelta: 0.01
        }}
      >
        <VelibMapMarkerScreen velib={velib}/>
        <UserMapMarkerScreen/>
      </MapView>
      <View style={{ flex: 1.2 }}>
        <Text style={styles.station_name}>{velib.fields.station_name}</Text>
        <View style={styles.station_descs}>
          <View style={styles.desc_line}>
            <Icon name="arrows-h" type='font-awesome' color={"#61dafb"}/>
            <Text style={styles.station_desc}>{distance.toFixed(2)} m de vous</Text>
          </View>
          <View style={styles.desc_line}>
            <Icon name="ticket" type='font-awesome' color={"#61dafb"}/>
            <Text style={styles.station_desc}>{velib.fields.nbfreedock} vélo(s) displonible(s)</Text>
          </View>
          <View style={styles.desc_line}>
            <Icon name="bolt" type='font-awesome' color={"#61dafb"}/>
            <Text style={styles.station_desc}>{velib.fields.nbfreeedock} vélo(s) éléctrique(s) displonible(s)</Text>
          </View>
          <View style={styles.desc_line}>
            {velib.fields.creditcard === "yes" && <Icon name="credit-card" type='font-awesome' color={"#61dafb"}/>}
            {velib.fields.creditcard === "yes" && <Text style={styles.station_desc}>Paiement par carte disponible</Text>}
          </View>
          <View style={styles.desc_line}>
            <Icon name="calendar" type='font-awesome' color={"#61dafb"}/>
            <Text style={styles.station_desc}>Mise a jour : {Moment(velib.record_timestamp).format('d MMMM, HH:mm')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  station_name: {
    flex: 1,
    color: "white",
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: "grey",
  },
  station_desc: {
    flex: 1,
    marginRight: 10,
    fontSize: 17,
    textAlign: 'right',
    color: "white"
  },
  station_descs: {
    flex: 5,
    paddingTop: 20,
    paddingLeft: 5,
  },
  desc_line: {
    flexDirection: 'row',
    marginBottom: 10,
  }
});

export default StationScreen;
