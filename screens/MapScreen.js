import React, { useEffect, useContext } from 'react';
import {
  ActivityIndicator, View,
  StyleSheet, Text
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';

import StationScreen from './StationScreen';
import UserMapMarkerScreen from './UserMapMarkerScreen';
import VelibMapMarkerScreen from './VelibMapMarkerScreen';
import VelibContext from '../contexts/velibContext';

const MapScreen = () => {
  const data = useContext(VelibContext);

  useEffect(() => {
    data.getVelibData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {
        data.currentLocation.length !== 0 &&
        <MapView
          style={{ flex: 1 }}
          region={{
           latitude:data.currentLocation.latitude,
           longitude:data.currentLocation.longitude,
           latitudeDelta: 0.03,
           longitudeDelta: 0.03
         }}
        >
          <UserMapMarkerScreen/>
          {
            data.velibsList && data.velibsList.length > 0 && data.velibsList.map((velib, i) => <VelibMapMarkerScreen key={i} velib={velib}/>)
          }
        </MapView>
      }
      {data.currentLocation.length == 0 && <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>}
    </View>
  );
}

MapScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={styles.screen_header}>
        <Icon name="dock" size={33} color={"#61dafb"}/>
        <Text style={styles.screen_header_text}>Carte</Text>
      </View>
    );
  },
  headerStyle: {
    backgroundColor: '#1B1D22',
  },
};

const styles = StyleSheet.create({
  screen_header: {
    flexDirection: 'row',
  },
  screen_header_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white"
  }
});

export default MapScreen;
