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
    form: 'halfCamRow',
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    viewSize: 200,
  };

  componentWillMount() {
    const { x, y } = this.state
    x.setValue(width - this.state.viewSize)
    y.setValue(80)
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
    else if (this.state.form == 'halfCamRow')  {
      return (
       <React.Fragment> 
       <View style = {styles.mainContainerHalfCamRow}>
            <View style = {styles.leftSqHalfCamRow}>
              <Camera
                style={styles.leftSqHalfCamRow}
                type={this.state.type}
                ref={camera => this.camera = camera}
              /> 
             {this.props.children}
            </View>
            <SVideoWeb formp = "halfCamRow" />
       
        </View>
        <SwapButton swapForm = {this.handleSwapForm}/>
        <ToolBar onShortCapture ={this.handleShortCapture} />
        <NavigationEvents
            onWillFocus={payload => { this.setState({ isFocused: true }) }}
            onDidBlur={payload => { this.setState({ isFocused: false }) }} />
        
      </React.Fragment>
      );
    }
    else if (this.state.form == 'movable') {
      return (
       <React.Fragment> 
       <View style={styles.fcamera}>
            <Camera
              style={styles.fcamera}
              type={this.state.type}
              ref={camera => this.camera = camera}
            />
            {this.props.children}
          </View>
          <SwapButton swapForm = {this.handleSwapForm}/>
          <ToolBar onShortCapture={this.handleShortCapture} />
          <NavigationEvents
            onWillFocus={payload => { this.setState({ isFocused: true }) }}
            onDidBlur={payload => { this.setState({ isFocused: false }) }} />
          <Animated.View
            {...this.Responder}
            resizeMode={'contain'}
            style={[styles.wvideo, imageStyle]} >
            <SVideoWeb
             formp = "movable"
             size={this.state.viewSize} />
          </Animated.View>

      </React.Fragment>
      );
    }
    else if (this.state.form == 'halfCamCol')  {
      return (
       <React.Fragment> 
       <View style = {styles.mainContainerHalfCamCol}>
            <SVideoWeb formp = "halfCamCol" />
            <View style = {styles.bottomSqHalfCamCol}>
              <Camera
                style={styles.bottomSqHalfCamCol}
                type={this.state.type}
                ref={camera => this.camera = camera}
              /> 
             {this.props.children}
            </View>
        </View>
        <SwapButton swapForm = {this.handleSwapForm}/>
        <ToolBar onShortCapture ={this.handleShortCapture} />
        <NavigationEvents
            onWillFocus={payload => { this.setState({ isFocused: true }) }}
            onDidBlur={payload => { this.setState({ isFocused: false }) }} />
        
      </React.Fragment>
      );
    }
  };
}
