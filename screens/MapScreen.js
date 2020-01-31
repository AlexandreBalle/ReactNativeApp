import React, { useEffect, useContext } from 'react';
import {
  ActivityIndicator, View,
  StyleSheet, Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon } from 'react-native-elements';

import StationScreen from './StationScreen';
import UserMapMarkerScreen from './UserMapMarkerScreen';
import VelibMapMarkerScreen from './VelibMapMarkerScreen';
import VelibContext from '../contexts/velibContext';
import { mapStyle } from "../mapStyle.json";

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
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={{ flex: 1 }}
          region={{
           latitude:data.currentLocation.latitude,
           longitude:data.currentLocation.longitude,
           latitudeDelta: 0.3,
           longitudeDelta: 0.3
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
  title: 'Carte',
  headerStyle: {
    backgroundColor: '#1B1D22',
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default MapScreen;
