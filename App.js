import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';

import styles from './styles/globalStyles';
/// components views
import Login from './components/Login';
import Home from './components/Home';
import ProfileScreen from './components/profileScreen';

///// partie recherche
import SearchHome from './components/searchHome.js';
import SearchResults from './components/searchResults.js';
import ServicerScreen from './components/user/servicerScreen.js';


import { Provider } from 'react-redux';

import store from './store/index';

import {  StackNavigator, TabNavigator } from 'react-navigation';

///// composants de navigation  ///////////////////////////////////////////////////////////////////////////////
const SearchNav = StackNavigator({
  Search: { screen: SearchHome },
  SearchResults: { screen: SearchResults },
  ServicerScreen: { screen: ServicerScreen}
},{
header: true
});

///// tab bar navigation :
const App = TabNavigator({
  Message: { screen: Home },
  Profile: { screen:ProfileScreen },
  Search: { screen:SearchNav }
},{
  header: true,
  animationEnabled: false,
  tabBarPosition: "bottom",
  tabBarOptions: {
    showLabel: true,
    activeBackgroundColor: '#dc4f35',
    inactiveBackgroundColor: 'rgba(234, 101, 76, 1)',
    labelStyle: {
      color: "#FFFFFF"
    },
    borderWidth: 0    
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default class myApp extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      logged:'false',
      selectedServicerIf:null
    };
    store.subscribe(() => {
      this.setState({logged:store.getState().loginActions.logged});
    });
   
  }


  render() {
    var screen  ;
    switch(this.state.logged){
      case 'false':
        screen = <Login />
        break
      case 'pendding':
        screen = <View style={styles.container} ><ActivityIndicator size="large" color="#ea654c" /></View>
        break
      case 'true':
        screen = <App />
        break
    }

    return (

      <Provider store={store} >
        <View style={{'flex':1}} > 
           <StatusBar
              hidden={true}
            />
            {screen}
        </View>
      </Provider>
    );
  }
}