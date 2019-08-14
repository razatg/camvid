import React from 'react';
import {Dimensions} from 'react-native';

import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import UpgradeScreen from '../screens/upgrade.screen';
import AboutScreen from '../screens/about.screen';
import ListVideo from '../screens/listOfVideo.screen';
import WatchVideo from '../screens/watch.screen';
import LearnVideo from '../screens/learn.screen';

import {Ionicons} from '@expo/vector-icons';
import MenuButton from '../components/menu.button';
import SwapButton from '../components/swap.button';
import styles from '../src/styles';


const DrawerNavigator = createDrawerNavigator({
    Lessons:{screen:ListVideo},
    Upgrade:{screen:UpgradeScreen},
    About:{screen:AboutScreen},
});

const AppStackNavigator = createStackNavigator(
    {
      Home: {
        screen:DrawerNavigator,
        navigationOptions:{
          headerLeft:(
            <Ionicons
              name = "md-menu"
              color = "#000000"
              size = {32}
              style = {styles.menuIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          title:'Lesson Schedule',
        }
      },
      Watch: {
        screen:WatchVideo,
        navigationOptions:{
          title:"Watch and Learn",
        },
      },
      Learn:{
        screen:LearnVideo,
        navigationOptions:{
          title:"Do and Learn",
          headerRight:(
            <SwapButton />
          ),
        },
      },
    },
    {
     defaultNavigationOptions:{

     }

    }
);




export default createAppContainer(AppStackNavigator);
