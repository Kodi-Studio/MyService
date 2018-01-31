import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';
import { connect } from 'react-redux';

import { initSelectedServicer, requestToShowServicer } from '../../store/action';

import styles from '../../styles/globalStyles';

import { jsxUser } from '../../methods/userMethods';


class UserRow extends React.Component {
    
      constructor(props) {
          super(props);
          console.log('****************');
            console.log(this.props);
            console.log('****************');
      }
     
      render(){ 

        //// definition de l'avatar
        var s = this.props.datas;
        var userJsx = new jsxUser( );
        avatar = userJsx.jsxAvatar('../../', s.sexe ,s.avatar);
        stars = userJsx.jsxStars(s.nb_stars);

        //////
        return (
            <TouchableHighlight onPress={()=>this.props.slideToServicer(this.props.datas)} >
                <View style={styles.listeRow} >
                
                    <View>
                        <View style={{flex:1, flexDirection:'row'}} >
                            <View style={styles.listeAvatarWrapper}>
                                {avatar}
                            </View>
                            <View >
                                <View>
                                    <Text style={styles.rowName} >{this.props.datas.prenom} {this.props.datas.nom}</Text>
                                </View>
                                <View style={styles.rowAdress} >
                                    <Text>{this.props.datas.cp}</Text>
                                    <Text>{this.props.datas.ville}</Text>
                                    <View style={styles.rowStarsWrapper} >
                                        {stars}
                                    </View>
                                    <Text style={styles.rowDescription} >{this.props.datas.description}</Text>
                                </View>                     
                            </View>
                        </View>
                    </View>
                    <View>
                    
                        <Text style={{textAlign:'right'}} ><Text style={styles.rowTarifPrix} >{this.props.datas.tarifs}€</Text>/hrs</Text> 
                    
                    </View>  

                </View>
            </TouchableHighlight>
        );

      };
}


const mapSateToProps = (state) => {
    return {
      stateselectedServicer: state.selectedServicer
    }
  }
const mapDispatchToProps = (dispatch) => {
  
    return {
      slideToServicer: (datas) => {
        dispatch( initSelectedServicer(datas) ) ;
        dispatch( requestToShowServicer() ) ;
      }
    }
  }
  
export default connect (mapSateToProps , mapDispatchToProps)(UserRow);