import React from 'react';
import {
  StyleSheet, Text,
  View, TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';

export default function ListItemScreen({item, stateModal}) {
  return (
    <TouchableHighlight onPress={(e) => stateModal(true, item)}>
      <View style={styles.item}>
        <Icon name="check-box" size={30} color={"#61dafb"}/>
        <Text style={styles.item_text}>{item.fields.station_name}</Text>
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
  },
  item_text: {
    marginLeft: 10,
    fontSize: 18,
    color: "white"
  },
});
