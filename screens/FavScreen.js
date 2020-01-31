import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet, Modal, Text,
  FlatList, View, ActivityIndicator,
  ScrollView, RefreshControl, SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';

import StationScreen from './StationScreen';
import ListItemScreen from './ListItemScreen';
import VelibContext from '../contexts/velibContext';

const FavScreen = () => {
  const data                            = useContext(VelibContext);
  const [velib, setVelib]               = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing]     = useState(false);

  useEffect(() => {
    data.getVelibData();
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const modalState = (value, velibValue = "") => {
    value ? setVelib(velibValue) : setVelib([]);
    setModalVisible(value);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    data.getVelibData();

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={styles.container}>
      {data.favList && data.favList.length > 0 &&
        <FlatList
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            return (
              <ListItemScreen item={item} stateModal={modalState}/>
            )
          }}
          data={data.favList}
          keyExtractor={item => item.recordid}
        />
      }
      {data.favList.length == 0 && <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>}
      {velib &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => modalState(false)}>
          <View style={styles.header}>
            <Icon name="close" size={35} onPress={() => modalState(false)} color={"#61dafb"}/>
          </View>
          <StationScreen velib={velib}/>
        </Modal>
      }
    </View>
  );
}

FavScreen.navigationOptions = {
  headerTitle: () => {
    return (
      <View style={styles.screen_header}>
        <Icon name="dock" size={33} color={"#61dafb"}/>
        <Text style={styles.screen_header_text}>Favoris</Text>
      </View>
    );
  },
  headerStyle: {
    backgroundColor: '#1B1D22',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
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
  header: {
    alignItems: 'flex-end',
    padding: 5,
    backgroundColor: "#1B1D22",
  },
  screen_header: {
    flexDirection: 'row',
  },
  screen_header_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white"
  }
});

export default FavScreen;
