import React from 'react';
import {
  StyleSheet, Text,
  View, TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from'prop-types';


const ListItemScreen = ({ item, stateModal }) => {
  const distance = parseFloat(item.fields.dist);

  return (
    <TouchableHighlight onPress={(e) => stateModal(true, item)}>
      <View style={styles.item}>
        <Icon name="check-box" size={30} color={"#61dafb"}/>
        <Text style={styles.item_text}>{item.fields.station_name}</Text>
        <Text style={styles.item_text_dist}>({distance.toFixed(2)} m)</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom:10,
    marginTop:10,
    height: 44,
    borderWidth: 0.5,
    borderColor: "grey",
    flex: 1,
  },
  item_text: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    flex: 1,
  },
  item_text_dist: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    textAlign: 'right',
    flex: 1,
  }
});

ListItemScreen.propTypes = {
  item: PropTypes.shape({
    datasetid: PropTypes.string,
    recordid: PropTypes.string,
    fields: PropTypes.shape({
      station_state: PropTypes.string,
      maxbikeoverflow: PropTypes.number,
      densitylevel: PropTypes.string,
      nbbikeoverflow: PropTypes.number,
      dist: PropTypes.string,
      nbedock: PropTypes.number,
      station_name: PropTypes.string.isRequired,
      kioskstate: PropTypes.string,
      nbfreeedock: PropTypes.number,
      station_type: PropTypes.string,
      station_code: PropTypes.string,
      creditcard: PropTypes.string,
      station: PropTypes.string,
      nbfreedock:PropTypes.number,
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
      coordinates: PropTypes.array
    }),
    record_timestamp: PropTypes.string
  }).isRequired,
  stateModal: PropTypes.func.isRequired
};

export default ListItemScreen;
