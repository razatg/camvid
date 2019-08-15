import React from 'react';
import {Ionicons} from '@expo/vector-icons';

import styles from '../src/styles';

export default class MenuButton extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home',
  }
  render () {
    return (
      <Ionicons
        name = "md-menu"
        color = "#000000"
        size = {32}
        style = {styles.menuIcon}
       
      />
    )
  }
};
