import React from 'react';;
import {Text, View, Header, Linking} from 'react-native';

import MenuButton from '../components/menu.button';
import styles from '../src/styles';

export default class HowItWorks extends React.Component{

  static navigationOptions = {
    title: 'About',
    color: "#000000",
    activeTintColor: 'e91e63',
  };

  render (){
    return(
      <View style={styles.container}>
        <Text style = {styles.pcontaineer}>
          Its very simple! {'\n'}{'\n'}

          Just place the your Mobile Phone on an elevated platform like top of a few Books or use a clip(like the one used in a car) in front of 
          your Yoga Mat and just follow the Yoga Routine. Belive you me, with this little trouble you will find the expereince of leaning way better
          than an offline yoga class.{'\n'}{'\n'}

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
