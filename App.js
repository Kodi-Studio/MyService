import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/// components views
import Login from './components/Login';

import { Provider } from 'react-redux';

import store from './store/index';



export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      logged:false
    };
    console.log(this.state);
    store.subscribe(() => { 
      //console.log('change !!!!');  
      console.log(store.getState());
      //this.setState({logged:store});
      this.setState({logged:store.getState().loginActions.logged});
    });
   
    ///store.dispatch({type:'LOGIN', text:'toto'});

  }

  render() {
    var screen  ;
    if(this.state.logged==false) screen = <Login /> ;
    else screen = <Text>Bienvenue</Text>

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
