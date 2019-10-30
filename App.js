import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import SearchScreen from './src/screens/SearchScreen'
import HomeScreen from './src/screens/HomeScreen'


const TabNav = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-cloud" size={24} color={tintColor} />
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-options" size={24} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    activeBackgroundColor: '#e9446a',
    activeTintColor: "white"
  }
});

export default createAppContainer(TabNav);


