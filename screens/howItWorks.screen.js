import React from 'react';;
import {Text, View, Header, Linking} from 'react-native';

import styles from '../src/styles';
import Amplitude from '../init/amplitudeInit';

export default class HowItWorks extends React.Component{

  static navigationOptions = {
    title: 'About',
    color: "#000000",
    activeTintColor: 'e91e63',
  };

  render (){
    Amplitude.logEvent('howItWorksLoad');
    return(
      <View style={styles.container}>
        <Text style = {styles.pcontaineer}>
          Its very simple! {'\n'}{'\n'}

          Just place the your Mobile Phone on an elevated platform like top of a few Books or use a clip(like the one used in a car) in front of 
          your Yoga Mat and just follow the Yoga Routine. Belive you me, with this little trouble you will find the expereince of learning way better
          than an offline yoga class.{'\n'}{'\n'}

          Here is link to some nice and inexpensive Phone 
          <Text style = {styles.linkText} onPress = {() => Linking.openURL('https://www.amazon.in/tripods-monopods/b?ie=UTF8&node=1389208031')}>Tripods and Monpods</Text>
          , these are great to have around while using this App and otherwise as well :){'\n'}{'\n'}

          If you have any feedback or feature request join this{' '}
            <Text style = {styles.linkText} onPress = {() => Linking.openURL('https://chat.whatsapp.com/I0UuBT1Vul35qyjr92LnsN')}>
              WhatsApp group
            </Text>
            {' '}and let us know.
        </Text>
      </View>
    );
  }
}
