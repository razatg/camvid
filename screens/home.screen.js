import React from 'react';
import { StatusBar ,StyleSheet, Text, View, WebView } from 'react-native';

import MovableCameraPage from '../src/movableCamera.page';
import HalfCameraRow from '../src/halfCameraRow.page';

import MenuButton from '../components/menu.button';
import styles from '../src/styles'

export default class HomeScreen extends React.Component {
  render() {
    return (
     <React.Fragment>
       
       <MovableCameraPage />
       <MenuButton navigation = {this.props.navigation}/>
     
     </React.Fragment>
    );
  }
}
