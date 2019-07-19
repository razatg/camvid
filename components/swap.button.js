import React from 'react';
import {Ionicons} from '@expo/vector-icons';

import styles from '../src/styles';

export default class SwapButton extends React.Component {

  
  render () {
    return (
      <Ionicons
        name = "md-swap"
        color = "#000000"
        size = {32}
        style = {styles.swapIcon}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    )
  }
};
