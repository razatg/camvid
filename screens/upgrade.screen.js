import React from 'react';
import {Text, View, Linking} from 'react-native'

import MenuButton from '../components/menu.button'
import styles from '../src/styles';


export default class UpgradeScreen extends React.Component {
  render (){
    return(
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.tcontainer}> Upgrade to Pro </Text>
        <Text style = {styles.pcontaineer}>
        The pro version has the following features:{'\n'}{'\n'}
         # No Ads. {'\n'}
         # Capture Video. {'\n'}
         # Increase/Decrease the size of the Camera and the Video frame or interchange them. {'\n'}
         # Many more features in development that you get Free Updates for!!!{'\n'}{'\n'}

          Go pro now !{'\n'}{'\n'}
          For how to go pro or feature requests join this{' '}
            <Text style = {styles.linkText} onPress = {() => Linking.openURL('https://chat.whatsapp.com/I0UuBT1Vul35qyjr92LnsN')}>
              WhatsApp group
            </Text>
            {' '}and let us know.
        </Text>
      </View>
    );
  }
}
