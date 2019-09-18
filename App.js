import React from 'react';
import { StatusBar ,StyleSheet, Text, View } from 'react-native';
//stay in current director type . and get out type ..
import CombineNavigator from'./navigation/combine.navigator';


export default class App extends React.Component {

  render() {
    return (
      <CombineNavigator />
    );
  }
}


