import React from 'react';
import { View, Image,ActivityIndicator, Alert } from 'react-native';

import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Form, Item, Label, Input, Title} from 'native-base';

import {Video, AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

import firebase from '../firebaseInit';
import Amplitude from '../amplitudeInit';


var ytPrefix = "https://www.youtube.com/embed/";
var thumb = require('../assets/noticeIcon.png');

export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
           title: "YoMo-Select a Yoga Routine",
           headerLeft: (
              <Ionicons
                 name="md-menu"
                 color="#000000"
                 size={25}
                 onPress={() => navigation.openDrawer()}
                 style={{ marginStart: 15 }}
              />),
        }
     }
    
    constructor(props){
        super(props);
        this.state = {
            homeCards:[],
            isReady:false,
            loading:"flex",
            contactDetails:null,
            isFormSubmited:false,
            listOfVid:[],
        }
    }

    componentWillMount(){
        firebase.database().ref('homeCards').once('value', (snapshot) =>{
            if (snapshot != null && snapshot != ""){
                this.setState({
                    homeCards:snapshot.val(),
                    loading:"none"
                });

            }else {
                this.setState({homeCards:[
                        {
                            "id":0,
                            "listName":"asana",
                            "imgLink":"https://img.youtube.com/vi/VWtHY710BL0/hqdefault.jpg",
                            "text":"Learn with beloved PM Modi",
                            "textNote":"Start Now!",
                            "cta":"List 0f 9 asanas to get you going"
                        },
                        {
                            "id":2,
                            "listName":"weightLoss",
                            "imgLink":"https://img.youtube.com/vi/WmSIMpIDa_A/hqdefault.jpg",
                            "text":"Weight Loss with Yoga",
                            "textNote":"Loose Now!",
                            "cta":"Looose and Prevent Weight Gain"
                        }
                ]});

            }

        });
        vidLis = [];
        this.state.homeCards.map((item, index)=>{
            console.log('didMount');
            firebase.database().ref(item.listName).once('value', (snapshot) =>{
                vidLis.push(snapshot.val());
                console.log(vidLis);
            })
        });
        this.setState({listOfVid:vidLis});
        console.log(this.state.listOfVid);
    }

    async componentDidMount(){
        await Font.loadAsync({
            Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
          });
        this.setState({isReady:true});
      } 
    
    postContact = () =>{
        if (this.state.contactDetails != null && this.state.contactDetails != ""){
            contactDetails = this.state.contactDetails;
            firebase.database().ref('liveWaitList').push({
                contactDetails
            }).then((data)=>{
                this.setState({isFormSubmited:true})
            }).catch((error)=>{

            })
        }else{
            Alert.alert(
                'Oops !',
                'Something went wrong. Pls try again.',[
                 {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},],
                { cancelable: false });
        }
    }

    getListOfVid = (key) =>{
        firebase.database().ref(key).once('value', (snapshot)=>{
            listOfVid = snapshot.val();
        });
        return listOfVid;
       
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
                    color = 'blue'
                    size = 'large'
                   />
               </View>
               {(this.state.isFormSubmited)
               ?
               <Card>
                   <CardItem bordered>
                     <Left>
                       <Icon active name ="md-checkmark-circle-outline" style={{color:"green"}}/>
                       <Text>Thanks! </Text>
                      </Left> 
                   </CardItem>
                   <CardItem>
                       <Left>
                       <Text>We will get back to you soon!</Text>
                       </Left>
                   </CardItem>
                    
                </Card>
               :
               <Card>
                   <CardItem bordered>
                     <Left>
                      <Icon active name ="md-calendar"/> 
                       <Text>Join Wait List for the Live Class</Text>
                     </Left>
                   </CardItem>
                    <Form>
                        <Item inlineLabel>
                          <Input placeholder = "Email/Phone" onChangeText ={(contactDetails) => this.setState({contactDetails})}/>
                          <Button info 
                           onPress = {()=> {
                               Amplitude.logEvent('LiveRegister');
                               this.postContact(this.state.contactDetails);
                               }
                               }>
                            <Text>I'am In</Text>
                        </Button>
                        </Item>
                        
                     </Form>
                </Card>
               }

               <Content >
                   {this.state.homeCards.map((item,index)=> {
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
                         onPress = {() => {
                             Amplitude.logEventWithProperties('HomeCard',{cardName:item.listName, typeTouch:"img"})
                             this.props.navigation.navigate('List',{listName:item.listName,listTitle:item.text});
                             }
                             }>
                             <Image
                                 source ={{uri:item.imgLink}}
                                 style = {{height:200, width:null, flex:1}}
                             />
                         </CardItem>
                         <CardItem>
                            <Left>
                              <Button transparent 
                               onPress = {() => {
                                   //Amplitude.logEventWithProperties('HomeCard',{cardName:item.listName, typeTouch:"cta"});
                                   //this.props.navigation.navigate('List',{listName:item.listName,listTitle:item.text})
                                   
                                   console.log(this.state.listOfVid);
                                   //this.props.navigation.navigate('Learn', {vUrl:ytPrefix+vidLis[0].ytId, vId:0, vForm:vidLis[0].form ,vLis:vidLis});
                                   }
                                   }>
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