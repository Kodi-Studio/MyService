import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, FlatList} from 'react-native';

import styles from '../../styles/globalStyles';

import HomeScreen from '../../components/HomeScreen';
import ProfileScreen from '../../components/ProfileScreen';
///// SERVICES
import { loadListeDemandes, initListeDemandesInStore } from '../services/services'

import { connect } from 'react-redux';
import { initUser , confirmShowDemandedetails, getListeDemandes } from '../../store/action';
import { map } from 'react-redux';

import UserFlatRow from './userFlatRow';


const _renderItem = ({ item }) => <Text >{item.email}</Text>;


class DemandesPrestas extends React.Component {
      static navigationOptions = {
        title : 'Demandes',
        tabBarIcon: () => (
            <Image
              source={require('../../assets/pictos/chat.png')}
              style={[styles.iconTabNav]}
            />
          ),
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle
      }
    
      constructor(props) {
          super(props);
          this.state ={
            demListe: {}
          }

          store.subscribe(()=>{
            this.testSlideToDemandeDetails();
           // console.log(store);
          })
          
      }

      testSlideToDemandeDetails() {
        if(store.getState().requestToSlideToDemandeDetails.slideTo == 'true'){

          this.props.navigation.navigate('MessagesPresta');
          /// on repasse selectedServicer.slideTo à false
          this.props.confirmSlideToDetailsDemande();
        }
      }

      componentDidMount(){
        initListeDemandesInStore(this , store.getState().getUserDatas.userDatas.id );
      }

      gotoDetails(id){

        //alert('id')
      }

      render(){ 


        return (
            <View>
            
            <View style={{padding:0}} >
              {(this.props.demListe!='EMPTY') ? 
              <FlatList data={this.props.demListe} keyExtractor={(item, index)=>index}  renderItem={
                  ({ item, index }) => (
                      <UserFlatRow
                        user={item} index={index}
                      />
                  )
                } />
               : <View></View> 
               }



            </View>


            </View>
        );

      };
}


const mapSateToProps = (state) => {
    return {
      login: state.login,
      pass: state.pass,
      demListe: state.listeDemandes.LISTE_DEMANDES
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
      confirmSlideToDetailsDemande: () => {
        dispatch( confirmShowDemandedetails() ) ;
      },
      initListeDemandes: (datas) => {
        dispatch( getListeDemandes(datas) ) ;
      }
    }
  }
  
export default connect (mapSateToProps , mapDispatchToProps)(DemandesPrestas);


/*

              <FlatList data={this.props.demListe} keyExtractor={(item, index)=>index}  renderItem={
                ({ item }) => (
                    <UserFlatRow
                      user={item} nav={this.navigation}
                    />
                )
              } />
              */