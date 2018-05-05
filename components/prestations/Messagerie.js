import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, ScrollView, Keyboard, Alert, ActivityIndicator, Dimensions, KeyboardAvoidingView } from 'react-native';

import styles from '../../styles/globalStyles';

import {timestampToString} from '../../methods/globalMethods'

import { connect } from 'react-redux';
import { initUser, getListeDemandes, initDatasDemandesToView, getDevice } from '../../store/action';
import { map } from 'react-redux';
///// SERVICES
import { loadListeDemandes, initListeDemandesInStore } from '../services/services'


class Messagerie extends React.Component {
      static navigationOptions = {
        title : 'Messages',
        tabBarIcon: () => (
            <Image
              source={require('../../assets/pictos/chat.png')}
              style={[styles.iconTabNav]}
            />
          ),
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTintColor: '#ffffff',
      }
      constructor(props) {
          super(props);
          this.state= {
            newMessage: '',
            peddingSendMessage: false,
            user:'',
            footerY:800,
            nbMessagesRendered: 0,
            windowHeight: Dimensions.get('window').height,
            scrollViewHeight: 0
          }
          this.hideKeybord = () => (  this.confirmSendMessage()  )
          this.onLayout = this.onLayout.bind(this);
      }

      componentDidMount () {
        this.props.defineDevice();
        let h = Dimensions.get('window').height;
        (store.getState().getDeviceType.device=='IphoneX') ? h -= 170 : h -= 100;
        this.setState({scrollViewHeight:h});
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);       
      }

      componentWillMount () {
       // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.hideKeybord );
        this.setState({user:this.props.datas.user});
        //this.scrollToBottom();
        //this.scroll.props.scrollToPosition(0, 100)
        
      }
      componentWillUnmount () {
       // this.keyboardDidHideListener.remove();
      }
      confirmSendMessage() {
        if(this.state.newMessage!=''){
          let myMessage = this.state.newMessage;
          
          Alert.alert(
            'Confirmation',
            'Envoyer votre message ?',
            [
              /*{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},*/
              {text: 'Non', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Oui', onPress: () => this.sendMessage() },
            ],
            { cancelable: false }
          )
        }

      }


      sendMessage(){
        let myMessage = this.state.newMessage;
        this.setState({newMessage:'', peddingSendMessage: true});
        let dem = this.state.user;//this.props.datas.user;
            ///// definition du destinataire
            let idDest;
            (dem.idClient == this.props.me.id) ? idDest = dem.idPrestataire : idDest = dem.idClient;
            let body =  "idPrestation="+dem.id+
                "&idClient="+dem.idClient+
                "&idPrestataire="+dem.idPrestataire+
                "&message="+myMessage+
                "&editor="+this.props.me.id+
                "&destinataire="+idDest;
           
            return fetch( "https://www.myservice-collaboratif.com/app/sendMessage.php" , {
                  method : 'POST', 
                  headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" },
                  body : body
                  }
                )
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log('-----------');
                  console.log(responseJson.DETAILS);
                  if(responseJson.DETAILS!="ERROR"){
                    //console.log(this.state.user);
                    //console.log( store.getState().getUserDatas.userDatas.id )
                    initListeDemandesInStore(this , store.getState().getUserDatas.userDatas.id );
                    this.setState({user:responseJson.DETAILS[0]});
                    //alert( this.state.user.index );
                    //console.log(store.getState().listeDemandes.LISTE_DEMANDES[this.state.user.index])
                    this.setState({peddingSendMessage: false });
                    ///// mise a jour du store
                  }else{
                    alert('Une erreur c\'est produite. Veuillez réessayez plus tard.');
                  }
                })
                .catch((error) => {
                // console.error(error);
                return false;
            });
            
      }

      scrollToBottom(anim){
        this.refs._mainScroll.scrollToEnd({animated: anim});
      }
      onLayout(event) {
        this.scrollToBottom(false);
      }


      _keyboardDidShow () {
        //alert('Keyboard Shown');
        var {height, width} = Dimensions.get('window');
        console.log(  Dimensions.get('window') );
      }
    
      _keyboardDidHide () {
        // alert('Keyboard Hidden');
        console.log('fermeture :');
        console.log(  Dimensions.get('window') );
      }

      render(){
        //this.setState({scrollViewHeight:100});
        //alert(this.state.scrollViewHeight);

        return (
          <View>
            <View style={{height:50}} >
              <Button title="Voir les détails de la prestation >" onPress={()=>this.scrollToBottom()} />
            </View> 
            <KeyboardAvoidingView
            behavior="position"
            style={{/*flexDirection:'column', /*flex:1, justifyContent: "space-between",*/ height:this.state.scrollViewHeight, width:'100%'}}
            enabled="true"
            >
       
          
            <ScrollView ref="_mainScroll" style={{ width:'100%', height:"100%",  paddingBottom:0}}  >                
              <View style={{padding:0}} style={{ marginBottom:190 }}  >
                { (this.state.user.messages.map((item, key) => (
                  (item.editor != this.props.me.id) ?
                  <View key={key}  onLayout={this.onLayout}   >
                    <Text style={styles.messageTime} >{timestampToString( item.dateEdit , 1  )}</Text>
                    <View style={[styles.messageFrom]} >
                      <Text style={styles.messageTextWhite} >{item.message}</Text>
                    </View>
                  </View>
                  : <View key={key} onLayout={this.onLayout}   >
                      <Text style={styles.messageTime}>{timestampToString( item.dateEdit , 1  )}</Text>
                      <View style={styles.messageTo} ><Text style={styles.messageTexteOrange} >{item.message}</Text></View>
                    </View>

                )) ) }
                {(this.state.peddingSendMessage === true) ? 
                  <View style={{paddingTop:30}}   onLayout={()=>this.scrollToBottom(true)}    ><ActivityIndicator size="small" color="#ea654c" /></View>
                  : <View></View>
                }
              </View>
            </ScrollView>
            <View style={{position:"absolute", width:"100%", bottom:50, height:130 , borderTopWidth:1, borderTopColor:"#c6c6c6",  backgroundColor:'#FFFFFF'}} >
              <View style={{/*flex:1,*/ flexDirection: "row", justifyContent: "space-between", borderColor:"#cc0000", height:40, padding:6 }} >
                  <View><Text style={styles.titleLabel} >Nouveau message :</Text></View>
                  <View><View style={styles.btnOrangeSmall}><Text onPress={() => this.sendMessage()} style={styles.btnOrangeTxt}>Envoyer</Text></View></View>
              </View>
              <View>
                <TextInput style={{borderWidth:0, height:90, width:'100%', marginBottom:0, marginTop:0, paddingHorizontal:10, fontSize:22 }}
                  editable = {true}
                  multiline= {true}
                  maxLength = {250}
                  placeholder = ""
                  value={this.state.newMessage}
                  onChangeText={(newMessage) => this.setState({newMessage})}
                  ref={(r) => { this._textInputRef = r; }}
                  spellCheck = {false}
                  />
              </View>
            </View>
            </KeyboardAvoidingView>
          </View>
        );
      };
}


const mapSateToProps = (state) => {
    return {
      datas: state.getDemandeDetailsSelected.datas,
      me: state.getUserDatas.userDatas
    }
  }
const mapDispatchToProps = (dispatch) => {
  
    return {
      initListeDemandes: (datas) => {
       /* let d = datas.LISTE_DEMANDES[0];
        console.log(d);
       // le d = datas.getDemandeDetailsSelected
        
        //dispatch( getListeDemandes(datas) ) ;
        ////this.setState({peddingSendMessage: false , user : datas[this.state.user.index]  });
       // console.log(datas)
       dispatch( initDatasDemandesToView(d) );
       console.log(store.getState().getDemandeDetailsSelected.datas);
       ()=>this.setState({user:store.getState().getDemandeDetailsSelected.datas});*/
      },
      defineDevice: (datas) => {
        dispatch( getDevice() );
      }
    }
  }
 


export default connect (mapSateToProps , mapDispatchToProps)(Messagerie);


/*

<Button  title="Envoyer" onPress={ () =>this.confirmSendMessage() } />

 <KeyboardAvoidingView
                behavior="position"
                style={{flexDirection:'column', flex:1, justifyContent: "space-between", borderWidth:4, borderColor:'#cc0000', width:'100%'}} 
                >
             
                <View>
                  <Button title="Voir les détails de la prestation >" onPress={()=>this.scrollToBottom()} />
                </View>
                <ScrollView ref="_mainScroll" style={{borderWidth:3, width:'100%', borderColor:"green", height:'60%'}}  > 
                      
                      
                        <View style={{padding:0}} style={{borderWidth:3, flex:3}}  >
                          { (this.state.user.messages.map((item, key) => (
                            (item.editor != this.props.me.id) ?
                            <View key={key}  onLayout={this.onLayout} style={{borderWidth:3}}  >
                              <Text style={styles.messageTime} >{timestampToString( item.dateEdit , 1  )}</Text>
                              <View style={[styles.messageFrom, {'borderWidth':3}]} >
                                <Text style={styles.messageTextWhite} >{item.message}</Text>
                              </View>
                            </View>
                            : <View key={key} onLayout={this.onLayout}   ><Text style={styles.messageTime}>{timestampToString( item.dateEdit , 1  )}</Text><View style={styles.messageTo} ><Text style={styles.messageTexteOrange} >{item.message}</Text></View></View>

                          )) ) }
                        

                        </View>
                      
                        {(this.state.peddingSendMessage== true) ? 
                                  <View style={{paddingTop:30}} ><ActivityIndicator size="small" color="#ea654c" /></View>
                                  : <View></View>
                            }
                </ScrollView>
                
                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", borderWidth:1, borderColor:"#cc0000" }} >
                        <View><Text style={styles.titleLabel} >Nouveau message :</Text></View>
                        <View><Text>Envoyer</Text></View>
                    </View>
                    <View style={{flex:1,  borderWidth:5, borderColor:"#000000", height:80 }} >
                      <TextInput style={{borderWidth:0, width:'100%', height:100, marginBottom:0, marginTop:15, paddingHorizontal:10, fontSize:22, backgroundColor:'#FFFFFF'}}
                          editable = {true}
                          multiline= {true}
                          maxLength = {250}
                          placeholder = "Votre message..."
                          value={this.state.newMessage}
                          onChangeText={(newMessage) => this.setState({newMessage})}
                          ref={(r) => { this._textInputRef = r; }}
                          />
                    </View>
                    <View style={{borderWidth:1, width:'100%', height:100, position:"absolute", bottom:0, backgroundColor:'#cc0000'}}
                      
                      >


                    </View>
             
            </KeyboardAvoidingView>
*/