import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, KeyboardAvoidingView , Modal, TouchableOpacity} from 'react-native';
import styles from '../styles/globalStyles';
import { connect } from 'react-redux';
import { initUser , initUserLogged, initListeCates } from '../store/action';
import { map } from 'react-redux';
import globalStyles from '../styles/globalStyles';

const colorFieldDefault =  "rgba(255,255,255,0)";


class Login extends React.Component {

  constructor(props) {
      super(props);
      this.state= {
        login : "",
        pass : "",
        modalRegisterVisible : false,
        registerFirstname : "",
        registerLastname : "",
        registerMail : "",
        registerPass : "",
        registerPassconfirm : "",
        colorFieldDefault : "rgba(255,255,255,0)",
        tabColorFields : {
          registerFirstname:colorFieldDefault,
          registerLastname:colorFieldDefault,
          registerMail:colorFieldDefault,
          registerPass:colorFieldDefault,
          registerPassconfirm:colorFieldDefault
        },
        errorFieldColor : "rgba(76,169,225,0.2)"
        //"rgba(0,117,196,1)"
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
          this.props.confirmUser( responseJson.userDatas );
          this.props.confirmListeCates( responseJson.catesParent , responseJson.cates );
          this.props.confirmLogged( responseJson.logged );
          
          return; // responseJson.logged;
      })
      .catch((error) => {
        // console.error(error);
        return false;
      });

      ///this.props.onSubmit(this.state.login, this.state.pass);
  }

  tryRegister() {

    let tab = this.state.tabColorFields;

    if(this.state.registerFirstname.length == 0)  tab.registerFirstname = this.state.errorFieldColor;
    if(this.state.registerLastname.length == 0)  tab.registerLastname = this.state.errorFieldColor;
    if(this.state.registerMail.length == 0)  tab.registerMail = this.state.errorFieldColor;
    if(this.state.registerPass.length == 0)  tab.registerPass = this.state.errorFieldColor;
    if(this.state.registerPassconfirm.length == 0)  tab.registerPassconfirm = this.state.errorFieldColor;


    this.setState({tabColorFields:tab});

    /*if(this.state.registerPass!=this.state.registerPassconfirm) message+= "Les mots de passe ne correspondent pas.\n";

    if(this.state.registerPass!= this.state.registerPassconfirm) message+= "Les mots de passe ne correspondent pas.\n";*/

  }

  closeModal() {
    this.setState({modalRegisterVisible:false});
  }
  navToRegister() {
    this.showModal();
  }
  showModal() {
    this.setState({modalRegisterVisible:true});
  }

  render() {
    return (
  
        <ImageBackground source={require('../assets/bgH.png')} style={styles.mainBG} >
        <KeyboardAvoidingView behavior="padding" style={{width:"100%", height:"100%"}} >
          <View style={globalStyles.containerLogin} >
            <View style={styles.loginTitleBox} ><Image source={require('../assets/logoH.png')} /></View>
            <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Identifiant'} value={this.state.login} editable={true} onChangeText= {(login) => this.setState({login})} style={ styles.inputTopTransp } />
            <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Mot de passe'} value={this.state.pass} editable={true} onChangeText= {(pass) => this.setState({pass})} style={ styles.inputTransp } secureTextEntry={true} />
            <TouchableHighlight  style={styles.buttonBottom}  onPress={ ()=>this.tryConnect() } >
              <Text style={styles.buttonTextWhite} > Ok </Text>
            </TouchableHighlight>
            <TouchableHighlight  style={styles.buttonWhite}  onPress={ ()=>this.navToRegister() } >
              <Text style={styles.buttonTextOrange} > Inscription </Text>
            </TouchableHighlight>
          </View>
          </KeyboardAvoidingView>
          { /*  modale d'inscription */ }
          <Modal
              visible={this.state.modalRegisterVisible}
              animationType={'slide'}
          >
            <View style={styles.modalHeader} >
              <Text style={styles.modalHeaderLabel} >Inscription </Text>
              <TouchableOpacity onPress={()=>this.closeModal()} ><Image source={require("../assets/pictos/cancel.png") }style={styles.modalHeaderClose} /></TouchableOpacity>
            </View>
            <View style={globalStyles.containerLogin} >
            <View style={styles.loginTitleBox} ><Image source={require('../assets/logoH.png')} /></View>
            <View ref="_formRegister" >
              <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Nom'} value={this.state.registerFirstname} editable={true} onChangeText= {(registerFirstname) => this.setState({registerFirstname})} style={ [styles.inputRegister, { backgroundColor:this.state.tabColorFields.registerFirstname}] } />
              <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Prénom'} value={this.state.registerLastname} editable={true} onChangeText= {(registerLastname) => this.setState({registerLastname})} style={ [styles.inputRegister, { backgroundColor:this.state.tabColorFields.registerLastname}]  } />
              <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Adresse email'} value={this.state.registerMail} editable={true} onChangeText= {(registerMail) => this.setState({registerMail})} style={ [styles.inputRegister, { backgroundColor:this.state.tabColorFields.registerMail}]  } />
              <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Mot de passe'} value={this.state.registerPass} editable={true} onChangeText= {(registerPass) => this.setState({registerPass})} style={ [styles.inputRegister, { backgroundColor:this.state.tabColorFields.registerPass}]  } secureTextEntry={true} />
              <TextInput placeholderTextColor={'rgba(0, 0, 0, 0.5)'} editable={true} placeholder={'Confirmation mot de passe'} value={this.state.registerPassconfirm} editable={true} onChangeText= {(registerPassconfirm) => this.setState({registerPassconfirm})} style={ [styles.inputRegister, { backgroundColor:this.state.tabColorFields.registerPassconfirm}]  } secureTextEntry={true} />
            </View>
            <TouchableHighlight  style={styles.buttonBottom}  onPress={ ()=>this.tryRegister() } >
              <Text style={styles.buttonTextWhite} > Ok </Text>
            </TouchableHighlight>

            </View>
          </Modal>
          { /* END modale d'inscription */ }
        </ImageBackground>
      

      
    
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


/*

<View style={styles.main} >
      <View style={styles.headerHome} >
        <Image source={require('../assets/logoH.png')} />
      </View>
      <ImageBackground source={require('../assets/bgH.png')} style={styles.mainBG} > 

        <TextInput placeholderTextColor={'#000000'} editable={true} placeholder={'Identifiant'} value={this.state.login} editable={true} onChangeText= {(login) => this.setState({login})} style={ styles.inputTop } />
        <TextInput placeholderTextColor={'#000000'} editable={true} placeholder={'Mot de passe'} value={this.state.pass} editable={true} onChangeText= {(pass) => this.setState({pass})} style={ styles.input } secureTextEntry={true} />
        <TouchableHighlight  style={styles.buttonBottom}  onPress={ ()=>this.tryConnect() } >
          <Text style={styles.buttonTextWhite} > Connexion </Text>
        </TouchableHighlight>
        <TouchableHighlight  style={styles.buttonTransparent}  onPress={ ()=>this.navToRegister() } >
          <Text style={styles.buttonText} > Inscription </Text>
        </TouchableHighlight>
        
      </ImageBackground>
    </View>



*/