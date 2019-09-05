import React from 'react';;
import {Text, View, Header, Linking} from 'react-native';

import styles from '../src/styles';

export default class AboutScreen extends React.Component{

  static navigationOptions = {
    title: 'About',
    color: "#000000",
    activeTintColor: 'e91e63',
  };

  render (){
    return(
      <View style={styles.container}>
        <Text style = {styles.pcontaineer}>
          We created this app out of our own need to learn about the Yoga asana
          or a Dance move or the Make up style from an online video but then not knowing if you were doing it right. {'\n'}{'\n'}

          This App gives immediate feedback through the phone camera used as mirror,
          running in background and the video in the same frame so that you could
          look at the video and then yourself at the same time for best learning experience.{'\n'}{'\n'}

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
