import React from 'react';
import {Text, View, Linking} from 'react-native'

import styles from '../src/styles';
import Amplitude from '../init/amplitudeInit';


export default class UpgradeScreen extends React.Component {
  render (){
    Amplitude.logEvent('UpgradeLoad');
    return(
      <View style={styles.container}>
        <Text style = {styles.pcontaineer}>
        The pro version has the following features:{'\n'}{'\n'}
         # No Ads. {'\n'}
         # Capture Video. {'\n'}
         # Get feedback and steps for improvement. {'\n'}
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
