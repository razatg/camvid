import {Dimensions} from 'react-native';

import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import UpgradeScreen from '../screens/upgrade.screen';
import AboutScreen from '../screens/about.screen';
import ListVideo from '../screens/listOfVideo.screen';
import HomeScreen from '../screens/home.screen';
import WatchVideo from '../screens/watch.screen';
import LearnVideo from '../screens/learn.screen';
import HowItWorksScreen from '../screens/howItWorks.screen'



const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth:WIDTH*0.83,
}



const AppStackNavigator = createStackNavigator(
    {
      Home: {
        screen:HomeScreen,
        },
      List: {
        screen:ListVideo,
      },  
      Watch: {
        screen:WatchVideo,
        navigationOptions:{
          title:"Watch and Learn",
        },
      },
      Learn:{
        screen:LearnVideo,
      },
      Upgrade:{
        screen:UpgradeScreen,
        navigationOptions:{
          title:"Upgrade Now!"
        },

      },
      About:{
        screen: AboutScreen,
        navigationOptions:{
          title:"About Us"
        },

      },
      How:{
        screen:HowItWorksScreen,
        navigationOptions:{
          title:"How It Works"
        }

      },
    },
    {
     defaultNavigationOptions:{

     }

    }
);


const DrawerNavigator = createDrawerNavigator({
  Home:{
    screen:AppStackNavigator,
  },
  How:{screen:HowItWorksScreen,
    navigationOptions:{
      title:'How It Works'
    },
  },
  Upgrade:{screen:UpgradeScreen},
  About:{screen:AboutScreen},
},DrawerConfig);




export default createAppContainer(DrawerNavigator);
