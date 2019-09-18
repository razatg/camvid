import React from 'react';
import { View, Image,ActivityIndicator, Alert, ToastAndroid } from 'react-native';

import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Form, Item, Label, Input, Title} from 'native-base';

import {Video, AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

import firebase from '../init/firebaseInit';
import Amplitude from '../init/amplitudeInit';


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
            contestEntered:false,
            listOfVid:[]
        }
    }

    async obtainNotificationPermissions(){
        let noticePermission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        console.log(noticePermission.status);
        if (noticePermission.status != "granted") {
            console.log('Notification permsisson not granted');
        }
        return noticePermission;
    }

    async scheduleNotification(){
        await this.obtainNotificationPermissions();
        notificationId = Notifications.scheduleLocalNotificationAsync(
            {
                title: "Watch yourself on Camera and Learn",
                body:"Just place your mobile on an elevated 🔭place in front of your yoga mat and start! Do Yoga at your own pace and learn from the best.",
                android:{
                    icon:"../assets/noticeIcon.png",
                    sound:false
                }
            },
            {
                time : (new Date()).getTime() + (1000*60*60*24)
            }
        ).catch((error)=> console.log(error));
        console.log(notificationId);
    }

    getRandomInt = () => {
        return Math.floor((Math.random()* 9) + 1);
    }

    socialProof = () => {
        ToastAndroid.showWithGravity("You are in good company " +this.getRandomInt() + " others are performing Asanas from this list!",
          ToastAndroid.LONG,
          ToastAndroid.CENTER);
      }

    componentWillMount(){
    
        firebase.database().ref('homeCards').orderByChild('id').once('value', (snapshot) =>{
            if (snapshot != null && snapshot != ""){
                snapshot.forEach(data => {
                    this.state.homeCards.push(data.val());
                    this.setState({ loading: "none" });
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
           this.getListOfVid(this.state.homeCards);
        });
    }



    async componentDidMount(){
        await Font.loadAsync({
            Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
          });
        this.setState({isReady:true});
        SecureStore.getItemAsync('contestInfo').then(
            (contestObj) => {
                let contestJson = JSON.parse(contestObj);
                if(contestJson){
                    this.setState({contestEntered:contestJson.entered});
                }
            }
        );
        


        SecureStore.getItemAsync('firstOpen').then(
            (foObject) => {
                if (foObject == null){
                    console.log('First time user, setting notification!')
                    this.scheduleNotification();
                    SecureStore.setItemAsync('firstOpen', JSON.stringify({isFirstOpen:true}));
                }else{
                    let foJson = JSON.parse(foObject);
                    foBool = foJson.isFirstOpen;
                     if (foBool){
                    //SecureStore.deleteItemAsync('firstOpen')
                       console.log('Repeat user, not setting notification again!')
                     }
                }
                
            }
        ).catch((error) => {
            console.log(error);
        });
        
      } 
    
    postContact = () =>{
        if (this.state.contactDetails != null && this.state.contactDetails != ""){
            contactDetails = this.state.contactDetails;
            firebase.database().ref('liveWaitList').push({
                contactDetails
            }).then((data)=>{
                this.setState({isFormSubmited:true});
                Amplitude.setUserId(contactDetails);
            }).catch((error)=>{
                console.log('Contact Firebase Issue', error);

            });
            Alert.alert(
                'You are in!',
                'Please note you need to learn Yoga on the app for min 30 mins, to be eligible. Winners paid every week!',[
                 {text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel'},],
                { cancelable: false });
            SecureStore.setItemAsync('contestInfo', JSON.stringify({entered:true}));

            
        }else{
            Alert.alert(
                'Oops !',
                'Something went wrong. Pls try again.',[
                 {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},],
                { cancelable: false });
        }
    }

    getListOfVid = (list) =>{
        vidLis = [];
        list.map((item, index)=>{
            firebase.database().ref(item.listName).once('value', (snapshot) =>{
                vidLis.push(snapshot.val());
            })
        });
        this.setState({listOfVid:vidLis});
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
               {(this.state.contestEntered)?
                 <View></View>:
                (this.state.isFormSubmited)?
                  <Card>
                     <CardItem bordered>
                       <Left>
                         <Icon active name ="md-checkmark-circle-outline" style={{color:"green"}}/>
                         <Text>You are In! </Text>
                        </Left> 
                     </CardItem>
                     <CardItem>
                       <Left>
                       <Text>Winners paid every week!</Text>
                       </Left>
                    </CardItem>
                  </Card>:
                     <Card>
                        <CardItem bordered>
                           <Left>
                             <Icon active name ="md-ribbon"/> 
                              <Text>Get ₹ 1 for 1 minute spent on Yoga: Healthy-Wealthy offer.</Text>
                          </Left>
                        </CardItem>
                        <Form>
                          <Item inlineLabel>
                          <Input placeholder = "Email/Phone" onChangeText ={(contactDetails) => this.setState({contactDetails})}/>
                          <Button info 
                           onPress = {()=> {
                               Amplitude.logEvent('TryRegister');
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
                             this.socialProof();
                             //this.props.navigation.navigate('List',{listName:item.listName,listTitle:item.text});
                             this.props.navigation.navigate('Learn', {vUrl:ytPrefix+vidLis[index][0].ytId, vId:0, vForm:vidLis[index][0].form ,vLis:vidLis[index]});
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
                                   Amplitude.logEventWithProperties('HomeCard',{cardName:item.listName, typeTouch:"cta"});
                                   this.socialProof();
                                   listOfVid=this.state.listOfVid;
                                   this.props.navigation.navigate('Learn', {vUrl:ytPrefix+vidLis[index][0].ytId, vId:0, vForm:vidLis[index][0].form ,vLis:vidLis[index]});
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