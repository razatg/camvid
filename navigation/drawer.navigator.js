import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {createDrawerNavigator, createAppContainer, withNavigation} from 'react-navigation';

import HomeScreen from '../screens/home.screen';
import UpgradeScreen from '../screens/upgrade.screen';
import AboutScreen from '../screens/about.screen';

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth:WIDTH*0.83,
}

const DrawerNavigator = createDrawerNavigator({
  Home:{
    screen: HomeScreen
  },
  Upgrade:{
    screen: UpgradeScreen,
    contentOptions: {
      title: 'Upgrade Now',
    },
  },
  About:{
    screen: AboutScreen,
    contentOptions: {
      headerTitle:'About',
    }
  },
},
DrawerConfig);

export default createAppContainer(DrawerNavigator);
