import React, { useContext } from 'react';
import {
  View, StyleSheet, Text, Button
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import Moment from 'moment';
import PropTypes from'prop-types';

import VelibMapMarkerScreen from './VelibMapMarkerScreen';
import UserMapMarkerScreen from './UserMapMarkerScreen';
import VelibContext from '../contexts/velibContext';

Moment.locale('fr');

const StationScreen = ({ velib }) => {
  const data       = useContext(VelibContext);
  const distance   = parseFloat(velib.fields.dist);
  const coordinate = velib.geometry.coordinates.length > 0 ? {
    latitude: velib.geometry.coordinates[1],
    longitude: velib.geometry.coordinates[0]
  } : {
    latitude: "",
    longitude: ""
  }

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
          {!data.favList.includes(velib) && (
              <View style={styles.button_fav}>
                <Button
                  title="Ajouter aux favoris"
                  color="#61dafb"
                  onPress={() => data.addToFav(velib)}
                  style={{ alignItems: 'flex-end' }}
                />
              </View>
            )
          }
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
  },
  button_fav: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 15
  }
});

StationScreen.propTypes = {
  velib: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.shape({
      datasetid: PropTypes.string,
      recordid: PropTypes.string,
      fields: PropTypes.shape({
        station_state: PropTypes.string,
        maxbikeoverflow: PropTypes.number,
        densitylevel: PropTypes.string,
        nbbikeoverflow: PropTypes.number,
        dist: PropTypes.string.isRequired,
        nbedock: PropTypes.number,
        station_name: PropTypes.string.isRequired,
        kioskstate: PropTypes.string,
        nbfreeedock: PropTypes.number.isRequired,
        station_type: PropTypes.string,
        station_code: PropTypes.string,
        creditcard: PropTypes.string.isRequired,
        station: PropTypes.string,
        nbfreedock:PropTypes.number.isRequired,
        duedate: PropTypes.string,
        nbebikeoverflow: PropTypes.number,
        nbebike: PropTypes.number,
        overflow: PropTypes.string,
        nbdock: PropTypes.number,
        geo: PropTypes.array,
        overflowactivation: PropTypes.string,
        nbbike: PropTypes.number,
      }).isRequired,
      geometry: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.array.isRequired
      }).isRequired,
      record_timestamp: PropTypes.string.isRequired
    }).isRequired
  ]),
};

export default StationScreen;
