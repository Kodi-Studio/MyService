import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, Picker, Modal, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { initUserListe } from '../store/action';
import { map } from 'react-redux';

import { navigationOptions } from 'react-navigation'

import styles from '../styles/globalStyles';


class SearchHome extends React.Component {
    static navigationOptions = {
        title : 'Recherche'
    }
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state = {
            ...this.state,
            'cates':store.getState().getListeCates.cates,

            'modalCatesParentVisible': false,
            'modalCatesVisible': false,

            'selectedCateParentLabel': 'Catégorie',
            'selectedCateParentId': store.getState().getListeCates.catesParent[0].id,

            'selectedCateLabel' : 'Sous Catégorie',
            'selectedCateId' : 'All',

            'cateParentSelected' : false,
            'cateSelected' : false,

            'waitWs' : false,
            'found' : false
        }

    }

    componentDidMount() {
    //
    }
    onChangeCateParent(value,index) {
        this.setState({'selectedCateParentId':value , 'selectedCateParentLabel': this.state.getListeCates.catesParent[index].mscat_libelle });
    }
    onChangeCate(value,index) {
        this.setState({'selectedCateId':value , 'selectedCateLabel': this.state.cates[index].mscat_libelle });
    }
    closeModalCatesParent(){ this.setState({ 'modalCatesParentVisible':false});   }
    closeModalCates(){  this.setState({ 'modalCatesVisible':false});   }
    selectParentCates(){
        if(this.state.selectedCateParentId == store.getState().getListeCates.catesParent[0].id) this.setState( {'selectedCateParentLabel': store.getState().getListeCates.catesParent[0].mscat_libelle } );
        var tri = [];
        this.state.getListeCates.cates.forEach(element => {
            if(element.mscat_parent == this.state.selectedCateParentId)  tri.push(element)
        });
        this.setState({'cates':tri , 'selectedCateId':'All' , 'cateParentSelected': true});
        this.closeModalCatesParent();
    }
    selectCates(){
        if(this.state.selectedCateId == 'All') this.setState( {'selectedCateLabel': 'Toutes les sous-catégories' } );
        this.setState({'cateSelected':true});
        this.closeModalCates();
    }
    showResults(){
        
        console.log( "selectedCateParentId="+this.state.selectedCateParentId+"&selectedCateId="+this.state.selectedCateId );
        //////// requete web service ->liste de résultats
        this.setState({'waitWs':true});
        return fetch( 'https://www.myservice-collaboratif.com/app/servicerListe.php' , {
            method : 'POST', 
            headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" },
            body: "selectedCateParentId="+this.state.selectedCateParentId+"&selectedCateId="+this.state.selectedCateId
              }
            )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({'waitWs':false});
                this.props.sendResult(responseJson.USER_LISTE)
                this.props.navigation.navigate('SearchResults');
                return; // responseJson.logged;
            })
            .catch((error) => {
              // console.error(error);
              return false;
            });
    }
    

    render(){ 
        
        if(this.state.cateParentSelected==true && this.state.found == false ) var libelleAffinerRecherche = 
            <View>
                <Text >Affiner votre recherche : </Text>
                <Text onPress={()=>this.setState({'modalCatesVisible':true})}  >{this.state.selectedCateLabel}</Text>
            </View>;
        else var libelleAffinerRecherchetoto = null;

        var spinner  ;
        switch(this.state.waitWs){
          case true:
            spinner = <View style={styles.container} ><ActivityIndicator size="large" color="#ea654c" /></View>
            break
          case false:
            spinner= null
            break
        }

        
        return (

            <View style={styles.container} >
                <Text>Rechercher un servicer :</Text>
                <View>
                    <Text onPress={()=>this.setState({'modalCatesParentVisible':true})}  >{this.state.selectedCateParentLabel}</Text>

                    { /* modale de sélection de catégorie parent */ }
                    <Modal
                        visible={this.state.modalCatesParentVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <Picker selectedValue={this.state.selectedCateParentId} onValueChange={(itemValue, itemIndex) => this.onChangeCateParent(itemValue,itemIndex)} >
                            {this.state.getListeCates.catesParent.map((item, key) => 
                                <Picker.Item label={item.mscat_libelle} value={item.id} key={key}  />
                            )} 
                        </Picker>
                        <Button onPress={()=>this.selectParentCates()} title='Valider'   />
                    </Modal>
                    { /* END modale de sélection de catégorie parent */ }
                    {libelleAffinerRecherche}
                    { /* modale de sélection de catégorie  */ }
                    <Modal
                        visible={this.state.modalCatesVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <Picker selectedValue={this.state.selectedCateId}   onValueChange={(itemValue, itemIndex) => this.onChangeCate(itemValue,itemIndex)} >
                            <Picker.Item label={'Toutes les sous catégories'} value={'All'} key={0}  />
                            {this.state.cates.map((item, key) => 
                                <Picker.Item label={item.mscat_libelle} value={item.id} key={key+1}  />
                            )} 
                        </Picker>
                        <Button onPress={()=>this.selectCates()} title='Choisir'   />
                    </Modal>
                    { /* END modale de sélection de catégorie  */ }
                    <View>{spinner}</View>
                    <View>
                    <Button title={"Trouver.."} onPress={()=>this.showResults()} />
                    </View>

                </View>
                    
            </View>

        );

    };
}

const mapSateToProps = (state) => {
    return {
      login: state.login,
      pass: state.pass
    }
  }
  const mapDispatchToProps = (dispatch) => {
  
    return {
      sendResult: (liste) => {
        dispatch( initUserListe(liste) ) ;
      }  
    }
  }
  
  export default connect (mapSateToProps , mapDispatchToProps)(SearchHome);
//export default SearchHome;