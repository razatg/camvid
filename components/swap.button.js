import React from 'react';
import {Ionicons} from '@expo/vector-icons';

import styles from '../src/styles';

export default class SwapButton extends React.Component {

  handleSwapForm = () => {
    if (this.state.form == 'halfCamRow'){
      this.setState({form:'halfCamCol'});
    }
    else if (this.state.form =='halfCamCol'){
      this.setState({form:'movable'})
    }
    else{
      this.setState({form:'halfCamRow'})
    }
  }

  
  render () {
    return (
      <Ionicons
        name = "md-swap"
        color = "#000000"
        size = {32}
        style = {styles.swapIcon}
        onPress={this.props.swapForm}
      />
    )
  }
};
