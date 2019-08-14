import React from 'react';
import {WebView, View, AppState, Text} from 'react-native';

import styles from '../src/styles';

import {Ionicons} from '@expo/vector-icons'




export default class WatchVideo extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            appState: AppState.currentState,
        }

    }

    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);

    }

    componentWillMount(){
        AppState.removeEventListener('change', this._handleAppStateChange);

    }

    _handleAppStateChange  = (nextAppState) =>{
        this.setState({appState:nextAppState});
    }


    render(){
        vurl = this.props.navigation.getParam('vUrl');
        vform = this.props.navigation.getParam('vForm');
        vlis = this.props.navigation.getParam('vLis');
        vid = this.props.navigation.getParam('vId');
        return(
            <View style = {styles.watchContainer}>
                <View style = {styles.watchVid}>
                {
                (this.state.appState == "active") ?
                  <WebView 
                    source = {{uri:vurl}}
                    style = {styles.watchVid}
                /> 
                : <View></View>

                }
                </View>
                <Text 
                style = {{bottom:48, right:55, position:"absolute", alignItems:"center"}
                }>Skip to learn</Text>
                <Ionicons 
                name = 'md-fastforward'
                size = {32}
                style = {{bottom:40, right:20, position:"absolute"}}
                onPress = {() => {this.props.navigation.navigate('Learn', {vId:vid,vUrl:vurl,vForm:vform,vLis:vlis})}}
            />
            </View>
        );
    }

}