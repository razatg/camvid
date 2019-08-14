import React from 'react';
import { StyleSheet, View, WebView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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
      loading:"flex"
    }

  }

  componentWillMount() {

    firebase.database().ref('asana').once('value', (snapshot) => {
      if (snapshot.val() != ""){
        this.setState({ listOfVid: snapshot.val(), loading:"none" });
        console.log(snapshot.val());

      } 
      else
        this.setState({ listOfVid: 
          [
            { "id":0,
              "ytId":"MnQ5_K-41Xk",
              "text":"A prayer to begin Yoga practice",
              "textNote":"Begin with a Paryer",
              "form":"halfCamCol"
            },
            {"id":1,
            "ytId":"_oM_OGcaSRQ",
            "text":"Padahastasana",
            "textNote":"Padahastasana is next",
            "form":"halfCamCol"
            },
            {"id":2,
            "ytId":"fIF016JROiA",
            "text":"Vrikshasana",
            "textNote":"Now Vrikshasana",
            "form":"movable"
            },
            {"id":3,
            "ytId":"GDwDN0DUNm8",
            "text":"Vajrasana",
            "textNote":"Vajrasana is next",
            "form":"halfCamCol"
            },
            {"id":4,
            "ytId":"-HgeZztTSec",
            "text":"Bhujangasana",
            "textNote":"Snake Pose is Next ",
            "form":"halfCamCol"
            },
            {"id":5,
            "ytId":"dkCiQuLwI1U",
            "text":"Shalabhasana",
            "textNote":"Let's be a Locust :)",
            "form":"halfCamCol"
            },
            {"id":6,
            "ytId":"misHjEvOskI",
            "text":"Trikonasana",
            "textNote":"Trikonasana Now",
            "form":"halfCamRow"
            },
            {"id":7,
            "ytId":"i_ix1f99Vn4",
            "text":"Ardha Chakrasana",
            "textNote":"The Half Wheel Pose",
            "form":"halfCamRow"
            },
            {"id":8,
            "ytId":"oh8z3FHjdW4",
            "text":"Savasana",
            "textNote":"Relax Now and Feel Good",
            "form":"movable"
            },
          ],
          loading:"none"
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
          <View style={{display:this.state.loading, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'  }}>
            <ActivityIndicator
              animating ={true}
              color = 'black'
              size = 'large'
            />
          </View>
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
                onPress = {()=>{this.props.navigation.navigate('Watch', {vUrl:'https://www.youtube.com/embed/'+item.ytId, vId:index,vForm:item.form ,vLis:this.state.listOfVid})}}
               >
                <Image
                  source = {{uri:'https://img.youtube.com/vi/'+item.ytId+'/hqdefault.jpg'}}
                  style = {{height:200, width:null, flex:1}}
                  />
              </CardItem>
              <CardItem>
                <Left>
                <Button transparent 
                  onPress = {() => {this.props.navigation.navigate('Learn', {vUrl:'https://www.youtube.com/embed/'+item.ytId, vId:index,vForm:item.form ,vLis:this.state.listOfVid})}}>
                    <Icon active name ="md-videocam"/>
                    <Text>Watch yourself on Camera and Learn.</Text>
                   </Button>
                </Left>
              </CardItem>
            </Card>
            );
          })}
          </Content>
        </Container>
  
      );

  } 
}


