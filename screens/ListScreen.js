import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Modal,
  FlatList, View, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';

import StationScreen from './StationScreen';
import ListItemScreen from './ListItemScreen';
import VelibContext from '../contexts/velibContext';

export default function ListScreen() {
  const data                            = useContext(VelibContext);
  const [velib, setVelib]               = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    data.getVelibData();
  }, []);

  const modalState = (value, velibValue = "") => {
    value ? setVelib(velibValue) : setVelib([]);
    setModalVisible(value);
  }

  return (
    <View style={styles.container}>
      {data.velibsList && data.velibsList.length > 0 &&
        <FlatList
          style={styles.container}
          renderItem={({ item }) => {
            return (
              <ListItemScreen item={item} stateModal={modalState}/>
            )
          }}
          data={data.velibsList}
          keyExtractor={item => item.recordid}
        />
      }
      {data.velibsList.length == 0 && <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>}
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

ListScreen.navigationOptions = {
  title: "Vélibs",
  headerStyle: {
    backgroundColor: '#1B1D22',
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: 'bold',
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
  }
});
