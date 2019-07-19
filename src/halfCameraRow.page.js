import React from 'react';
import {Text, View, ToastAndroid, Alert } from 'react-native';
import {Camera, Permissions} from 'expo';
import { NavigationEvents } from 'react-navigation';

import Svideoweb from './svideoweb.page';
import ToolBar from '../components/toolbar.component';
import styles from './styles'


export default class HalfCameraRow extends React.Component {
    camera = null;
    state = {
      hasCameraPermission:null,
      type: Camera.Constants.Type.front,
      isFocused: true,
  
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

    handleShortCapture = () => {
      ToastAndroid.showWithGravity('Only the Pro vesion has the Recording Feature. Pls Upgrade!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER);
    }

    render(){
      const { hasCameraPermission, isFocused } = this.state;
      if (hasCameraPermission == null){
        return <View />
      }
      else if (hasCameraPermission === false){
        return <Text>Camera permission Denied!</Text>
      }
      if (isFocused == false){
        return(
          <NavigationEvents
          onWillFocus = {payload => this.setState({isFocused:true})}
          onDidBlur =  {payload => this.setState({isFocused:false})}
        />
        );
      }
      else {
        return(
          <React.Fragment>
             <Camera
               style = {this.props.style}
               type={this.state.type}
               ref={camera => this.camera = camera}
              />
              <ToolBar onShortCapture={this.handleShortCapture} />
              <NavigationEvents
                onWillFocus={payload => { this.setState({ isFocused: true }) }}
                onDidBlur={payload => { this.setState({ isFocused: false }) }} /> 
          </React.Fragment>
            
        );
      }
    }


}
