import React from 'react';
import { StatusBar ,StyleSheet, Text, View, ToastAndroid } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import MovableCameraPage from '../src/movableCamera.page';
import HalfCameraRow from '../src/halfCameraRow.page';
import ListVideo from './listOfVideo.screen'

import MenuButton from '../components/menu.button';
import ToolBar from '../components/toolbar.component';
import styles from '../src/styles'

export default class LearnVideo extends React.Component {
  
  constructor(props){
    super(props);
  }

  handleShortCapture = () => {
    ToastAndroid.showWithGravity('Only the Pro vesion has the Recording Feature. Pls Upgrade!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
  }


  handleSkipBackward = () => {
    vid = this.props.navigation.getParam("vId");
    vlis = this.props.navigation.getParam("vLis");
    prevVidId = vid - 1;
    
    if (prevVidId >= 0 ) 
      {
        prevVidYtid = vlis[prevVidId]["ytId"];
        prevVidForm =  vlis[prevVidId]["form"];
        const resetActions = StackActions.reset({
          index:0,
          actions:[NavigationActions.navigate({
            routeName:'Learn',
            params:{vId:prevVidId,vUrl:'https://www.youtube.com/embed/'+prevVidYtid, vForm:prevVidForm, vLis:vlis},
          })
          ],
        });
        this.props.navigation.dispatch(resetActions);
      }
    else {
      ToastAndroid.showWithGravity('That is the Frst Video in the Lesson!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
      this.props.navigation.navigate('Home');
    }
  }


  handleSkipForward = () => {
    vid = this.props.navigation.getParam("vId");
    vlis = this.props.navigation.getParam("vLis");
    nextVidId = vid+1;
    
    if (nextVidId < vlis.length) 
      {
        nextVidYtId = vlis[nextVidId]["ytId"];
        nextVidForm =  vlis[nextVidId]["form"];
        const resetActions = StackActions.reset({
          index:0,
          actions:[NavigationActions.navigate({
            routeName:'Watch',
            params:{vId:nextVidId,vUrl:'https://www.youtube.com/embed/'+nextVidYtId, vForm:nextVidForm, vLis:vlis },
          })

          ],
        });
        this.props.navigation.dispatch(resetActions);
      }
    else {
      ToastAndroid.showWithGravity('Well Done, That was the last Video in the Lesson!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    vurl = this.props.navigation.getParam('vUrl');
    vform = this.props.navigation.getParam('vForm');
    return (
     <React.Fragment>
       
       <MovableCameraPage 
         vUrl = {vurl}
         vForm = {vform}
       />

       <ToolBar 
          onShortCapture ={this.handleShortCapture} 
          onSkipBackward = {this.handleSkipBackward}
          onSkipForward = {this.handleSkipForward}

        />
     
     </React.Fragment>
    );
  }
}
