import React from 'react';
import {
  Platform, StatusBar,
  StyleSheet, View
} from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import VelibProvider from './providers/velibProvider';

const App = () => {
  return (
    <View style={styles.container}>
      <VelibProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </VelibProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
