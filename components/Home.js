import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';

import styles from '../styles/globalStyles';

import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';

/*import {  StackNavigator } from 'react-navigation';
const App = StackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
});
*/

import { connect } from 'react-redux';
import { initUser } from '../store/action';
import { map } from 'react-redux';


class Home extends React.Component {
      static navigationOptions = {
        title : 'Messages',
        header: true,
        tabBarIcon: () => (
            <Image
              source={require('../assets/pictos/chat.png')}
              style={[styles.iconTabNav]}
            />
          ),
      }
    
      constructor(props) {
          super(props);
          this.state = store.getState();
      }

      test() {
        console.log(this.props);
        //console.log(store.getState());
        console.log( JSON.parse(this.state.datas.booked) );
        //this.props.confirmLogged( 'false' );
        this.props.navigation.navigate('Profile') 
      }

      render(){ 


        return (
            <View>
               <Button title="Page suivante" onPress={ () =>this.test() } />
            </View>
        );

      };
}


const mapSateToProps = (state) => {
    return {
      login: state.login,
      pass: state.pass
    }
  }
const mapDispatchToProps = (dispatch) => {
  
    return {
      confirmLogged: (logged) => {
        dispatch( initUser(logged) ) ;
      },
      peddingLogin: (logged) => {
        dispatch( initUser(logged) ) ;
      }
    }
  }
  
export default connect (mapSateToProps , mapDispatchToProps)(Home);