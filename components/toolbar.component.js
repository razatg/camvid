import React from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Ionicons} from '@expo/vector-icons';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

import styles from  '../src/styles';

export default ({capturing = false, onShortCapture,}) => (
  <Grid style = {styles.bottomToolbar}>
    <Row>
      <Col style={styles.alignCenter}>
      </Col>
     <Col size={2} style={styles.alignCenter}>
        <TouchableWithoutFeedback onPress={onShortCapture}>
          <View style={styles.captureBtn}>
            {capturing && <View style={styles.captureBtnInternal} />}
          </View>
        </TouchableWithoutFeedback>
      </Col>
      <Col style ={styles.alignCenter}></Col>
    </Row>
  </Grid>
);
