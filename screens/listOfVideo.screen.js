import React from 'react';
import { StyleSheet, View, WebView, Image, TouchableOpacity } from 'react-native';
import {Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right} from 'native-base';

import {Video, AppLoading} from 'expo';
import * as Font from 'expo-font';

import firebase from '../firebaseInit';



export default class ListVideo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isReady:false,
      listOfVid: [],
    }

  }

  componentWillMount() {

    firebase.database().ref('listOfVids').once('value', (snapshot) => {
      if (snapshot.val() != ""){
        this.setState({ listOfVid: snapshot.val() });
        console.log(snapshot.val());

      } 
      else
        this.setState({ listOfVid: 
          [
            {"id":1,
              "img":"https://img.youtube.com/vi/1xRX1MuoImw/hqdefault.jpg",
              "watch":"https://www.youtube.com/watch?v=1xRX1MuoImw",
              "text":"Learn Surya Namaskar",
              "textNote":"Watch and Do SuryaNamaskar"},
              {"id":2,
              "img":"https://img.youtube.com/vi/hVc_EN0lbwo/hqdefault.jpg",
              "watch":"https://www.youtube.com/watch?v=hVc_EN0lbwo",
              "text":"Learn Surya Namaskar Again",
              "textNote":"Watch and Do SuryaNamaskar Again",},
          ]
        })
    });
  }

  async componentDidMount(){
    await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
    this.setState({isReady:true});
  } 


  render(){
    if(!this.state.isReady){
      return (
        <AppLoading/>
      );
    }

      return(
        <Container>
          <Content>
          {this.state.listOfVid.map((item,index) =>{
            return(
              <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.text}</Text>
                    <Text note>{item.textNote}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody
                button
                onPress = {()=>{this.props.navigation.navigate('Watch', {vUrl:item.watch, vId:index,vForm:item.form ,vLis:this.state.listOfVid})}}
               >
                <Image
                  source = {{uri:item.img}}
                  style = {{height:200, width:null, flex:1}}
                  />
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent 
                  onPress = {() => {this.props.navigation.navigate('Watch', {vUrl:item.watch, vId:index,vForm:item.form ,vLis:this.state.listOfVid})}}>
                    <Icon active name ="md-play" />
                    <Text>Watch and Learn</Text>
                   </Button>
                </Left>
                <Body>
                  <Button transparent 
                  onPress = {() => {this.props.navigation.navigate('Learn', {vUrl:item.watch, vId:index,vForm:item.form ,vLis:this.state.listOfVid})}}>
                    <Icon active name ="md-videocam"/>
                    <Text>Do and Learn</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
            );
          })}
          </Content>
        </Container>
  
      );

  } 
}


