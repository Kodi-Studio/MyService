import React from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';

import { connect } from 'react-redux';

import { getUser } from '../store/action';

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

  render() {
    return (
      <View style={styles.container}>
        <TextInput editable={true} placeholder={'Identifiant'} value={this.state.login} editable={true} onChangeText= {(login) => this.setState({login})} style={ {width:200, height:50, borderWidth:1 } } />
        <Button title={'Connexion'} onPress={()=>this.props.onSubmit(this.state.login)} />
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
    login: state.login
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    onSubmit: (loginSaisie) => {
      console.log('demande de connexion') ;
      dispatch( getUser(loginSaisie) ) ;
    }
  }
}

export default connect (mapSateToProps , mapDispatchToProps)(Login);
