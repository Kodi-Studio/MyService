import React from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';

import { connect } from 'react-redux';

import { initUser } from '../store/action';

//import store from '../store/index';


import { map } from 'react-redux';

class Login extends React.Component {

  constructor(props) {
      super(props);
      this.state= {
        login : "",
        pass : ""
      }
  }

  tryConnect(){
    //// interrogation du seveur
    this.props.confirmLogged( 'pendding' );
    return fetch( 'https://www.myservice-collaboratif.com/app/login.php' , {
      method : 'POST', 
      headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" },
      body: "login="+this.state.login+"&password="+this.state.pass
        }
      )
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('--->'+responseJson.logged);
          this.props.confirmLogged( responseJson.logged );
          return; // responseJson.logged;
      })
      .catch((error) => {
        // console.error(error);
        return false;
      });

      ///this.props.onSubmit(this.state.login, this.state.pass);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput editable={true} placeholder={'Identifiant'} value={this.state.login} editable={true} onChangeText= {(login) => this.setState({login})} style={ {width:200, height:50, borderWidth:1 } } />
        <TextInput editable={true} placeholder={'Mot de passe'} value={this.state.pass} editable={true} onChangeText= {(pass) => this.setState({pass})} style={ {width:200, height:50, borderWidth:1 } } />
        <Button title={'Connexion'} onPress={()=>this.tryConnect()} />
      </View>
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


const mapSateToProps = (state) => {
  return {
    login: state.login,
    pass: state.pass
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    confirmLogged: (logged) => {
      console.log('onSubmit :'+logged) ;
      dispatch( initUser(logged) ) ;
    },
    peddingLogin: (logged) => {
      dispatch( initUser(logged) ) ;
    }
  }
}

export default connect (mapSateToProps , mapDispatchToProps)(Login);
