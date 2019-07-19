import React from 'react';
import { View, Text, Alert, ToastAndroid, TouchableOpacity, Dimensions, Animated, WebView } from 'react-native';
import { Camera, Permissions } from 'expo';
import { NavigationEvents } from 'react-navigation';

import SVideoWeb from './svideoweb.page';
import SwapButton from '../components/swap.button';
import ToolBar from '../components/toolbar.component';

import { createResponder } from 'react-native-gesture-responder'

const { width, height } = Dimensions.get('window');

import styles from './styles';

export default class MovableCameraPage extends React.Component {
  camera = null;
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    isFocused: true,
    big: false,
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    viewSize: 200,
  };

  componentWillMount() {
    const { x, y } = this.state
    x.setValue(width - this.state.viewSize)
    y.setValue(40)
    this.Responder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderMove: (evt, gestureState) => {
        this.pan(gestureState)
      },
      onPanResponderTerminationRequest: () => true,
    })
  }

  pan = (gestureState) => {

    let size = this.state.viewSize;
    if (gestureState.pinch && gestureState.previousPinch) {
      size *= (gestureState.pinch / gestureState.previousPinch)
    }
    const { x, y } = this.state
    const maxX = width - this.state.viewSize
    const minX = 0
    const maxY = height - this.state.viewSize
    const minY = 0

    const xDiff = gestureState.moveX - gestureState.previousMoveX
    const yDiff = gestureState.moveY - gestureState.previousMoveY
    let newX = x._value + xDiff
    let newY = y._value + yDiff

    if (newX < minX) {
      newX = minX
    } else if (newX > maxX) {
      newX = maxX
    }

    if (newY < minY) {
      newY = minY
    } else if (newY > maxY) {
      newY = maxY
    }

    x.setValue(newX)
    y.setValue(newY)
    if (size < 150)
      this.setState({ viewSize: 200 })
    else if (size > width)
      this.setState({ viewSize: width })
    else
      this.setState({ viewSize: size })
  }

  handleShortCapture = () => {
    ToastAndroid.showWithGravity('Only the Pro vesion has the Recording Feature. Pls Upgrade!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
  }

  async requestPermission() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (camera.status !== "granted") {
      Alert.alert('Permission Needed', 'Oops, We need camera permission to make this app work!', [
        { text: 'Ok', onPress: () => this.requestPermission() }
      ], { cancelable: false });
    };
    if (audio.status !== "granted") {
      Alert.alert('Permission Needed', 'Oops, We need audio permission to make this app work!', [
        { text: 'Ok', onPress: async () => this.requestPermission() }
      ], { cancelable: false });
    };
    const hasCameraPermission = (camera.status === "granted" && audio.status === "granted");
    this.setState({ hasCameraPermission });
  }

  async componentDidMount() {
    this.requestPermission();
  }
  render() {

    const {
      x, y,
    } = this.state
    const imageStyle = { left: x, top: y }

    const { hasCameraPermission, focusedScreen } = this.state;
    console.log(hasCameraPermission);
    if (hasCameraPermission === null) {
      return <View />;
    }
    else if (hasCameraPermission === false) {
      return <Text> Camera permission denied. </ Text>;
    }
    else if (this.state.isFocused === false) {
      return (
        <NavigationEvents
          onWillFocus={payload => { this.setState({ isFocused: true }) }}
          onDidBlur={payload => { this.setState({ isFocused: false }) }}
        />
      );
    }
    else {
      return (
       <View> 
       <View style = {styles.mainContainerHalfCamRow}>
        <View style = {styles.rightSqHalfCamRow}>
            <Camera
              style={styles.leftSqHalfCamRow}
              type={this.state.type}
              ref={camera => this.camera = camera}
            />
           </View> 
          <View style={styles.rightSqHalfCamRow}>
          <WebView
              javaScriptEnabled = {true}
              //source = {{uri:'https://www.youtube.com/watch?v=1xRX1MuoImw&'}}
              source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/videoseries?list=PLIifgxZhXVBGi08eHjqE6u1rNAMV0KMnB" + "?modestbranding=0&playsinline=0&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'}} 
             />
          </View>
       
        </View>
        <SwapButton/>
        
      </View>
      );
    }
  };
}
