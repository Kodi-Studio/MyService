import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, ScrollView, Keyboard, Alert, ActivityIndicator, Dimensions, KeyboardAvoidingView } from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


import styles from '../../styles/globalStyles';

import {timestampToString} from '../../methods/globalMethods'

import { connect } from 'react-redux';
import { initUser, getListeDemandes, initDatasDemandesToView } from '../../store/action';
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
      }
      
      constructor(props) {
          super(props);
          this.state= {
            newMessage: '',
            peddingSendMessage: false,
            user:'',
            footerY:800,
            nbMessagesRendered: 0,
            windowHeight: Dimensions.get('window').height
          }
          this.hideKeybord = () => (  this.confirmSendMessage()  )
          this.onLayout = this.onLayout.bind(this);
      }

      componentDidMount () {
       
      }

      componentWillMount () {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.hideKeybord );
        this.setState({user:this.props.datas.user});
        //this.scrollToBottom();
        //this.scroll.props.scrollToPosition(0, 100)
      }
      componentWillUnmount () {
        this.keyboardDidHideListener.remove();
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
        let dem = this.state.user//this.props.datas.user;
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

      scrollToBottom(){
       //console.log(this.refs._scrollView.height);
        /// () => { this.refs._scrollView.scrollTo({x:0 , y:200, animated:true}); } 
        let Y =  this.state.footerY-Dimensions.get('window').height;
        //if(  this.state.footerY>this.state.windowHeight ) Y = this.state.footerY+this.state.windowHeight
        this.refs._mainScroll.scrollTo({x:0 , y:Y, animated:true});

      }
      onLayout(event) {
        const layout = event.nativeEvent.layout
        //  alert(layout.height);
        let h = this.state.footerY + layout.height;
        let nM = this.state.nbMessagesRendered+1;
        this.setState({footerY:h , nbMessagesRendered:nM});
        console.log( this.state.nbMessagesRendered+'  '+this.state.user.messages.length   );
        if(this.state.nbMessagesRendered+1==this.state.user.messages.length  ) this.scrollToBottom();
        //  this.test();
      }
     
      render(){ 

       
        return (

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
                <View>
                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between" }} >
                        <View><Text style={styles.titleLabel} >Nouveau message :</Text></View>
                        <View><Button  title="Envoyer" onPress={ () =>this.confirmSendMessage() } /></View>
                    </View>
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
             
            </KeyboardAvoidingView>
  
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
      }
    }
  }
  
export default connect (mapSateToProps , mapDispatchToProps)(Messagerie);


/*




*/