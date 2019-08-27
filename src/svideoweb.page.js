import React from 'react';
import { View,WebView, KeyboardAvoidingView, Text, AppState } from 'react-native';


import styles from './styles';



export default class SVideoWeb extends React.Component {
  constructor(props) {
    super();
    this.state = {
      url: '',
      appState: AppState.currentState,
    }
  }

  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount(){
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({appState:nextAppState});
  }

  render() {
    const { size } = this.props;

    if (this.props.formp === "movable" ){
      return (

        <View>
        {(this.state.appState == "active") ?
          <WebView
            ref={(ref) => { this.videoPlayer = ref; }}
            style={{ width: size, height: size }}
            scalesPageToFit={true}
            source = {{ uri: this.props.vUrl }}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
            onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
          /> : <View></View>}
      </View>

    );
    }
    else if(this.props.formp=="halfCamRow"){
      return(
        <View style={styles.rightSqHalfCamRow}>
        {(this.state.appState == "active") ?
        <WebView
              javaScriptEnabled = {true}
              //source = {{ uri: this.props.vUrl+"?autoplay=1&mute=1&modestbranding=0&playsinline=0&showinfo=0&rel=0" }}
              source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="'+ this.props.vUrl +'" + "?autoplay=1&modestbranding=0&playsinline=0&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'}} 
             />: <View></View>}
        </View>
      );
    }

    else if(this.props.formp=="halfCamCol"){
      return(
        <View style={styles.topSqHalfCamCol}>
        {(this.state.appState == "active") ?
        <WebView
              javaScriptEnabled = {true}
              javaScriptEnabledAndroid={true}
              mediaPlaybackRequiresUserAction ={false}
              //source = {{ uri: this.props.vUrl+"?autoplay=1&mute=1&modestbranding=0&playsinline=0&showinfo=0&rel=0" }}
              source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe id="svideo" src="'+ this.props.vUrl +'" + "?enablejsapi=1&autoplay=1&mute=1&modestbranding=0&playsinline=0&showinfo=0&rel=0" frameborder="0" allow="accelerometer; autoplay" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'}} 
             />: <View></View>}
        </View>
      );
    }
    
  }
}
