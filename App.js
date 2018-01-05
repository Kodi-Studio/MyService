import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

/// components views
import Login from './components/Login';

import { Provider } from 'react-redux';

import store from './store/index';



export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      logged:'false'
    };
    store.subscribe(() => { 
      this.setState({logged:store.getState().loginActions.logged});
    });
   
  }

  render() {
    var screen  ;
    /*if(this.state.logged=='false') screen = <Login /> ;
    else screen = <View style={styles.container} ><Text  >Bienvenue</Text></View>
    switch(this.state)*/
    switch(this.state.logged){
      case 'false':
        screen = <Login />
        break
      case 'pendding':
        screen = <View style={styles.container} ><ActivityIndicator size="large" color="#ea654c" /></View>
        break
      case 'true':
        screen = <View style={styles.container} ><Text  >Bienvenue</Text></View>
        break
    }

    return (
      <Provider store={store} >
        {screen}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
