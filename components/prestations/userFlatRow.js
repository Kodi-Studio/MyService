import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';
import { connect } from 'react-redux';

import { navToDemandeDetails, initDatasDemandesToView } from '../../store/action';

import styles from '../../styles/globalStyles';

import { jsxUser } from '../../methods/userMethods';


class UserFlatRow extends React.Component { 
    

    constructor(props) {
        super(props);
        this.state = props.user;
    }

    gotoDetails(datas){
        console.log('---------------------');
        //alert(datas.index);
        this.props.requestShoWdetails(datas)
    }


   
    render(){

         //// definition de l'avatar
         var userJsx = new jsxUser( 'small' );
         avatar = userJsx.jsxAvatar('../../', this.state.sexe ,this.state.avatar);

        //////
        return (
            <TouchableHighlight onPress={()=>this.gotoDetails(this.props)} >
               
                    
                        <View style={{flex:1, flexDirection:'row', alignContent:'center', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth:1, paddingBottom:6 , paddingTop:6 }} >
                            <View style={stylesFlatRows.userAvatar} >{avatar}</View>
                            <View>
                                <Text >{this.state.prenom+' '+this.state.nom}</Text>
                                <Text>Tonte de pelouse</Text>
                            </View>
                            
                            <Image style={[stylesFlatRows.next ]}  source={require('../../assets/pictos/next-1.png')}  />
                        </View>
                    
                    

            </TouchableHighlight>
        );

      };
}
const stylesFlatRows = StyleSheet.create({


    userAvatar: {
        marginRight:20
    },
    next : {
        position:"absolute",
        width: 10,
        height:10,
        right: 12
    }

});

const mapSateToProps = (state) => {
    console.log('****');
    return {
      //index: state.index
    }
  }
const mapDispatchToProps = (dispatch) => {
  
    return {
      requestShoWdetails: (datas) => {
        console.log(datas);
        dispatch( initDatasDemandesToView(datas) ) ;
        dispatch( navToDemandeDetails() ) ;
        
      }
    }
}
  
export default connect (mapSateToProps , mapDispatchToProps)(UserFlatRow);