import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {createDrawerNavigator, createAppContainer, withNavigation} from 'react-navigation';

import UpgradeScreen from '../screens/upgrade.screen';
import AboutScreen from '../screens/about.screen';
import ListVideo from '../screens/listOfVideo.screen';
import WatchVideo from '../screens/watch.screen';
import LearnVideo from '../screens/learn.screen';

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth:WIDTH*0.83,
}

const DrawerNavigator = createDrawerNavigator({
  Learn:{
    screen: LearnVideo
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
    },
  },
  Lessons:{
    screen:ListVideo,

  },
  Watch: WatchVideo,
},
DrawerConfig);

export default createAppContainer(DrawerNavigator);
