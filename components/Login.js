import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';
import styles from '../styles/globalStyles';
import { connect } from 'react-redux';
import { initUser , initUserLogged, initListeCates } from '../store/action';
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
          console.log('Datas user : '+responseJson.userDatas);
          console.log('Cates parentes : '+responseJson.catesParent);
          console.log('Cates : '+responseJson.cates);
          this.props.confirmLogged( responseJson.logged );
          this.props.confirmUser( responseJson.userDatas );
          this.props.confirmListeCates( responseJson.catesParent , responseJson.cates );
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


const mapSateToProps = (state) => {
  return {
    login: state.login,
    pass: state.pass
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    peddingLogin: (logged) => {
      dispatch( initUser(logged) ) ;
    },
    confirmLogged: (logged) => {
      dispatch( initUserLogged(logged) ) ;
    },
    confirmUser: (user) => {
      dispatch( initUser( user ) );
    },
    confirmListeCates: ( catesParent , cates ) => {
      dispatch ( initListeCates(catesParent , cates) );
    }

  }
}

export default connect (mapSateToProps , mapDispatchToProps)(Login);