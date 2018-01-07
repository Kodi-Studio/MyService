import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';
import styles from '../styles/globalStyles';

import { connect } from 'react-redux';
import { initUser } from '../store/action';
import { map } from 'react-redux';

class HomeScreen extends React.Component {
    
      constructor(props) {
          super(props);
      }
      static navigationOptions = {
        title: 'Welcome'
      };

      disConnect() {
        this.props.confirmLogged( 'false' );
      }
    
      render(){ 

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.main} >
                <View style={styles.headerHome} >
                    <Image source={require('../assets/logoH.png')} />
                </View>
                <Text> ceci est mon texte </Text>
               
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
  
  export default connect (mapSateToProps , mapDispatchToProps)(HomeScreen);