import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import FavScreen from '../screens/FavScreen';

const ListStack = createStackNavigator(
  {
    Home: ListScreen,
  }
);

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor}/>
  ),
};

const MapStack = createStackNavigator(
  {
    Links: MapScreen,
  }
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="map" size={20} color={tintColor}/>
  )
};

const FavStack = createStackNavigator(
  {
    Links:FavScreen,
  }
);

FavStack.navigationOptions = {
  tabBarLabel: 'Favoris',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="star" size={20} color={tintColor}/>
  )
};

export default createBottomTabNavigator({
  ListStack,
  MapStack,
  FavStack
}, {
    tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "#61dafb", // active icon color
        inactiveTintColor: 'white',  // inactive icon color
        style: {
            backgroundColor: '#1B1D22' // TabBar background
        }
    }
});
