import React from 'react';
import { Style, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font';

class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

export default App

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.welcome}>
        <View style={{}}>
          <Text style={{fontSize: 50, letterSpacing: 5, paddingBottom: 350}}>
            Shredr
          </Text>
        </View>
        <View style={styles.welcomeButtons}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('Home')} style = {{width: "30%"}}>
              <View style = {{backgroundColor: 'black', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 5,
                            marginRight: 25}}
                    >
                  <Text style = {{color: 'white', paddingVertical: 20}}>Login</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => alert('Sign Up Pressed')} style = {{width: "50%"}}>
              <View style = {{backgroundColor: 'red', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 5}}
                    >
                  <Text style = {{color: 'white', paddingVertical: 20}}>Sign Up</Text>
              </View>
          </TouchableOpacity>
        </View>      
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  render() {
    return (
      <View style={styles.main}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Profile!</Text>
      </View>
    );
  }
}

class FoodScreen extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Your Diet!</Text>
      </View>
    );
  }
}

class ActivityScreen extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Your Activity!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    },
    
  },
  Food: {
    screen: FoodScreen,
    navigationOptions: {
      tabBarLabel: 'Diet',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-pizza" color={tintColor} size={24} />
      )
    }
  },
  
  Activity: {
    screen: ActivityScreen,
    navigationOptions: {
      tabBarLabel: 'Activity',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-walk" color={tintColor} size={24} />
      )
    }
  },
  
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color={tintColor} size={24} />
      )
    }
  },
  
  Settings: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    }
  },
},
{
  initialRouteName: 'Home',
  order:['Home', 'Food', 'Activity', 'Profile', 'Settings'],
  swipeEnabled: true,

  navigationOptions:({ navigation }) => {
    const { routeName } = navigation.state.routes
    [navigation.state.index];
    return {
      tabBarVisible: 'true',
      headerTitle: routeName
    }
  },
  
  tabBarOptions: {
    inactiveTintColor: 'grey',
    activeTintColor: 'red',
    style: {
      backgroundColor: 'black'
    }
  }

}
);

const AppStackNavigator = createStackNavigator({
  TabNavigator:{
    screen: TabNavigator
  } 
  
},{
  defaultNavigationOptions:({navigation}) =>{
    return{
      headerLeft:(
        <Icon name="ios-menu" size={30} 
          style={{paddingLeft: 20}} onPress={() => navigation.openDrawer()}/>
      )
    }
  },
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: AppStackNavigator
  },
  Logout: {
    screen: WelcomeScreen
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen:WelcomeScreen},
  Home: {screen:AppDrawerNavigator}
})

const AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  main: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' },
  
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "33%"
  },
  
  welcomeButtons: {
    flexDirection:"row",
  }
})

const Tab = createAppContainer(TabNavigator);