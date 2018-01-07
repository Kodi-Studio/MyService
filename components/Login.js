import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';
import styles from '../styles/globalStyles';
import { connect } from 'react-redux';
import { initUser } from '../store/action';
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

  navToRegister() {
    
  }

  render() {
    return (
     <View style={styles.main} >
      <View style={styles.headerHome} >
        <Image source={require('../assets/logoH.png')} />
      </View>
      <ImageBackground source={require('../assets/bgH.png')} style={styles.mainBG} > 

        <TextInput placeholderTextColor={'#000000'} editable={true} placeholder={'Identifiant'} value={this.state.login} editable={true} onChangeText= {(login) => this.setState({login})} style={ styles.inputTop } />
        <TextInput placeholderTextColor={'#000000'} editable={true} placeholder={'Mot de passe'} value={this.state.pass} editable={true} onChangeText= {(pass) => this.setState({pass})} style={ styles.input } secureTextEntry={true} />
        <TouchableHighlight  style={styles.buttonBottom}  onPress={ ()=>this.tryConnect() } >
          <Text style={styles.buttonText} > Connexion </Text>
        </TouchableHighlight>
        <TouchableHighlight  style={styles.buttonTransparent}  onPress={ ()=>this.navToRegister() } >
          <Text style={styles.buttonText} > Inscription </Text>
        </TouchableHighlight>
        
      </ImageBackground>
    </View>
    );
  }
}

/*
const styles = StyleSheet.create({
  headerHome: {
    backgroundColor:"#FFFFFF",
    height:'25%',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  mainBG: {
    height: '75%',
    width: '100%',
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    width: 200,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: "center"
  },
  inputTop: {
    width: 200,
    height:50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: "center"
  },
  buttonBottom: {
    backgroundColor: '#ea654c',
    width: 200,
    height:50,
    alignItems: 'center',
    padding: 15,
    borderBottomLeftRadius : 8,
    borderBottomRightRadius : 8
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
    width: 200,
    height:50,
    alignItems: 'center',
    padding: 15,
    borderBottomLeftRadius : 8,
    borderBottomRightRadius : 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});
*/

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

export default connect (mapSateToProps , mapDispatchToProps)(Login);
