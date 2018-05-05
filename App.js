import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';

import styles from './styles/globalStyles';
/// components views
import Login from './components/Login';
import ProfileScreen from './components/ProfileScreen';

///// partie demande messagerie
import DemandesPrestas from './components/prestations/DemandesPrestas';
import DemandeDetails from './components/prestations/DemandeDetails';
import Messagerie from './components/prestations/Messagerie';

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

const MassagesNav = StackNavigator({
  MessagesHome: { screen: DemandesPrestas},
  MessagesPresta: { screen:Messagerie  },
  DemandesDetails: { screen:DemandeDetails  },
},{
header: true
});



///// tab bar navigation :
const App = TabNavigator({
  DemandesPrestas: { screen: MassagesNav },
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
              hidden={false}
            />
            {screen}
        </View>
      </Provider>
    );
  }
}