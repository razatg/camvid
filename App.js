import React from 'react';
import { StatusBar ,StyleSheet, Text, View } from 'react-native';
//stay in current director type . and get out type ..
import HomeScreen from './screens/home.screen';
import DrawerNavigator from './navigation/drawer.navigator';


export default class App extends React.Component {
  render() {
    return (
      <DrawerNavigator />
    );
  }
}
