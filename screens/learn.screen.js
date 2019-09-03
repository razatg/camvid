import React from 'react';
import { ToastAndroid, Button } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

import MovableCameraPage from '../src/movableCamera.page';

import ToolBar from '../components/toolbar.component';
import styles from '../src/styles';
import Amplitude from '../amplitudeInit'

var ytPrefix = "https://www.youtube.com/embed/"

export default class LearnVideo extends React.Component {
  static navigationOptions = ({navigation}) => { 
    return {
      title:"Do and Learn",
      headerRight:(
        <Ionicons
          name = "md-repeat"
          color = "#000000"
          size = {32}
          onPress={navigation.getParam('handleSwap')}
          style = {styles.swapIcon}
       />
      ),
    }
  }


  constructor(props){
    super(props);
    this.state ={
      vForm:this.props.navigation.getParam('vForm'),
    }
  }


  swapForm = () => {
      Amplitude.logEvent("LearnSwapForm");
      currForm = this.state.vForm;
      if ( currForm === 'halfCamCol')
      {
        this.setState({vForm:'halfCamRow'});
      }
      else if (currForm === 'halfCamRow'){
        this.setState({vForm:'movable'});
      }
      else{
        this.setState({vForm:'halfCamCol'});
      }
      ToastAndroid.showWithGravity('Changing Screen Layout.',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
  }

  componentDidMount(){
    this.props.navigation.setParams({handleSwap:this.swapForm});
  }



  handleShortCapture = () => {
    Amplitude.logEvent("LearnShortCapture");
    ToastAndroid.showWithGravity('Only the Pro vesion has the Recording Feature. Pls Upgrade!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
  }


  handleSkipBackward = () => {
    Amplitude.logEvent("LearnSkipBack");
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
            params:{vId:prevVidId,vUrl:ytPrefix+prevVidYtid, vForm:prevVidForm, vLis:vlis},
          })
          ],
        });
        this.props.navigation.dispatch(resetActions);
      }
    else {
      Amplitude.logEvent("LearnSkipBackBegin");
      ToastAndroid.showWithGravity('That is the Frst Video in the Lesson!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
      this.props.navigation.navigate('Home');
    }
  }


  handleSkipForward = () => {
    Amplitude.logEvent("LearnSkipFwd");
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
            params:{vId:nextVidId,vUrl:ytPrefix+nextVidYtId, vForm:nextVidForm, vLis:vlis },
          })

          ],
        });
        this.props.navigation.dispatch(resetActions);
      }
    else {
      Amplitude.logEvent("LearnSkipFwdEnd");
      ToastAndroid.showWithGravity('Well Done, That was the last Video in the Lesson!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER);
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    Amplitude.logEvent('LearnLoad')
    vurl = this.props.navigation.getParam('vUrl');
    return (
     <React.Fragment>
       
       <MovableCameraPage 
         vUrl = {vurl}
         vForm = {this.state.vForm}
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
