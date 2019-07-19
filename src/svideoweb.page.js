import React from 'react';
import { View,WebView, KeyboardAvoidingView, Text, AppState } from 'react-native';
import { Notifications } from 'expo';

import firebase from '../firebaseInit'

import styles from './styles';

export default class SVideoWeb extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      appState: AppState.currentState,
    }
  }

  componentWillMount() {

    firebase.database().ref('url').on('value', (snapshot) => {
      if (snapshot.val() != "")
        this.setState({ url: snapshot.val() })
      else
        this.setState({ url: "https://www.youtube.com/watch?v=1xRX1MuoImw&t=71s" })
    });
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

    return (

      <View>
        {(this.state.appState == "active") ?
          <WebView
            ref={(ref) => { this.videoPlayer = ref; }}
            style={{ width: size, height: size }}
            scalesPageToFit={true}
            source={{ uri: this.state.url }}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
            onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
          /> : <View></View>}
      </View>
    )
  }
}
