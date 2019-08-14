import React from 'react';
import ListVideo from '../screens/listOfVideo.screen';
import WatchVideo from '../screens/watch.screen';
import LearnVideo from '../screens/learn.screen';

import {createStackNavigator, createAppContainer} from 'react-navigation';


export default class StackNavigator extends React.Component {
    render(){
        return(
            <AppContainer />
        );

    }
}


const AppStackNavigator = createStackNavigator(
    {
    Home: {
      screen:ListVideo,
        },
    Watch: {
        screen:WatchVideo
         },
    Learn:{
            screen:LearnVideo
        }
    },
    {defaultNavigationOptions:{
    }}
  
  )
  
  
  const AppContainer = createAppContainer(AppStackNavigator);



