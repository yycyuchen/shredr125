import React from 'react';
import { Style, StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { FlatList } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';

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
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 65, letterSpacing: 5, color: 'white'}}>
            SHREDR
          </Text>
          <Text style={{fontSize: 16, color: 'white', paddingBottom: 150, color: 'grey'}}>
            Weightloss For All...
          </Text>
        </View>
        <View style={styles.welcomeButtons}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('Home')} style = {{width: "75%", margin: 15}}>
              <View style = {{backgroundColor: '#0275d8', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 20, width:'100%'}}
                    >
                  <Text style = {{color: 'white', paddingVertical: 20}}>Login</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => alert('Sign Up Pressed')} style = {{width: "75%", margin: 15}}>
              <View style = {{backgroundColor: '#d9534f', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 20}}
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      isFocused: false,
      query: '' 
    }
    
    this.queryAPI = this.queryAPI.bind(this)

  }

  handleFocus = () => this.setState({isFocused: true})
  handleBlur = () => this.setState({isFocused: false})
  handleLoading = () => this.setState({isLoading: true})
  handleNotLoading = () => this.setState({isLoading: false})

  componentDidMount() {
    
    return fetch('https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=c9dc09ec&app_key=21e7a415c52d252e4c4bb6a20f3016ab')
      .then ( (response) => response.json() )
      .then ( (responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.hints,
        })

      })

      .catch((error) => {
        console.log(error)
      })
  }

  queryAPI() {

    this.setState({ isLoading: true })

    var str = this.state.query
    
    str = str.replace(" ", "%20")

    var url = ('https://api.edamam.com/api/food-database/parser?ingr=' 
                + str + 
                '&app_id=c9dc09ec&app_key=21e7a415c52d252e4c4bb6a20f3016ab')

    console.log(url)

    
    return fetch(url)
    .then ( (response) => response.json() )
    .then ( (responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.hints,
      })

    })

    .catch((error) => {
      console.log(error)
    })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.main}>
          <ActivityIndicator />
        </View>
      )
    }
    else {
      
      try {
        var food = JSON.parse(JSON.stringify(this.state.dataSource[0].food))
      }
      catch(err) {
        return (

          <View>
            
            <TextInput  placeholder="Food Search"
                onFocus={this.handleFocus} onBlur={this.handleBlur} style={[styles.input, 
                  {borderColor: this.state.isFocused ? '#5bc0de' : 'white',}]} 
                  onChangeText={(text) => this.setState({query: text})}
                  onSubmitEditing={this.queryAPI}>        
            </TextInput>

            <Text style={{alignSelf:'center', fontSize:30, marginTop: 10}}>Item Not Found.</Text>

        </View> )
      }
      
      return (

        <View>
          
          <TextInput  placeholder="Food Search"
              onFocus={this.handleFocus} onBlur={this.handleBlur} style={[styles.input, 
                {borderColor: this.state.isFocused ? '#5bc0de' : 'white',}]} 
                onChangeText={(text) => this.setState({query: text})}
                onSubmitEditing={this.queryAPI}>        
          </TextInput>

          <View style={{height: '100%'}}>
            <Text style={{alignSelf:'center', fontSize:20, marginTop: 10,}}>{food.label.toUpperCase()}</Text>
            <Text style={{alignSelf:'center', fontSize:12, marginBottom: 50}}>(Serving-Size: 100g)</Text>
            <FlatList scrollEnabled={false}
              data={[
                {key: 'Calories: ', value: food.nutrients.ENERC_KCAL},
                {key: 'Protein: ', value: food.nutrients.PROCNT},
                {key: 'Fat: ', value: food.nutrients.FAT},
                {key: 'Carbs: ', value: food.nutrients.CHOCDF},
                {key: 'Fiber: ', value: food.nutrients.FIBTG},
              ] } styles={{justifyContent: "center"}}
              renderItem={({item})=> <Text style={styles.item}>{item.key.toUpperCase()}{item.value}g </Text>}
            />

            

          </View>
        </View>

        
      );
    }
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

  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: 5,
  },
  
  item: {
    fontSize: 16,
    height: 100,
    lineHeight: 70,
    textAlign: 'center',
    backgroundColor: '#d9534f',
    color: 'white',
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "33%",
    backgroundColor: '#292b2c',
  },
  
  welcomeButtons: {
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },

  input: {
    backgroundColor: 'white',
    height: 50,
    width: '90%',
    borderWidth: 1,
    margin: '5%',
    borderRadius: 10,
    paddingHorizontal: 20,
  }

})

const Tab = createAppContainer(TabNavigator);