import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, Picker, Modal, ActivityIndicator,KeyboardAvoidingView, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { initUserListe, confirmShowServicer } from '../store/action';
import { map } from 'react-redux';

import { navigationOptions } from 'react-navigation'

import styles from '../styles/globalStyles';


class SearchHome extends React.Component {
    static navigationOptions = {
        title : 'Recherche',
        tabBarIcon: () => (
            <Image
              source={require('../assets/pictos/magnifying-glass.png')}
              style={[styles.iconTabNav]}
            />
          ),
    }
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state = {
            ...this.state,
            cates:store.getState().getListeCates.cates,
            catesParent:store.getState().getListeCates.catesParent,

            modalCatesParentVisible: false,
            modalCatesVisible: false,

            selectedCateParentLabel: '',
            selectedCateParentId: '',

            selectedCateLabel : '',
            selectedCateId : 'All',

            cateParentSelected : false,
            cateSelected : false,

            waitWs : false,
            found : false,

            latitude: '',
            longitude: '',
            cp: ''
        };
        store.subscribe(() => {
            this.testSlideToServicer();
        });

    }

  

    testSlideToServicer() {
        /// on sruveille selectedServicer du store pour savoir si on doit slider vers la vue du servicer
        /// l'initialisation se fait dans userRow
        if(store.getState().requestToSlideToServicer.slideTo == 'true'){
            this.props.navigation.navigate('ServicerScreen');
            /// on repasse selectedServicer.slideTo à false
            this.props.confirmSlideToServicer();
        }
    }

    componentDidMount() {

       this.setState({selectedCateParentId:store.getState().getListeCates.catesParent[0].id } );

       navigator.geolocation.getCurrentPosition(
         (position) => {

           this.getCP( position.coords.latitude , position.coords.longitude )

           this.setState({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             error: null,
           });
         },
         (error) => this.setState({ error: error.message }),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
       );
    }
    getCP(lat, lg ) {

        return fetch( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lg+"&sensor=false&key=AIzaSyAFDOpw0q2IFJ0elwgAnLpQAH2vSWGFprY" , {
            method : 'GET', 
            headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" }
            }
            )
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({cp:responseJson.results[2].address_components[0].long_name})
            })
            .catch((error) => {
            // console.error(error);
            return false;
        });
    }

    setLatLg(cp){
         return fetch( "https://maps.googleapis.com/maps/api/geocode/json?address="+cp+"%20france&sensor=false&key=AIzaSyAFDOpw0q2IFJ0elwgAnLpQAH2vSWGFprY" , {
            method : 'GET', 
            headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" }
            }
            )
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({latitude:responseJson.results[0].geometry.location.lat  , longitude:responseJson.results[0].geometry.location.lng })
            })
            .catch((error) => {
            return false;
        });
    }


    initTipedCp( tipedCp ){
        console.log(tipedCp);
        this.setState({cp:tipedCp.cp});
        if(tipedCp.cp.length==5){
            this.refs.InputCp.blur();
            this.setLatLg(tipedCp.cp);
        }
    }

    onChangeCateParent(value,index) {
        this.setState({selectedCateParentId:value , selectedCateParentLabel: this.state.getListeCates.catesParent[index].mscat_libelle });
    }
    onChangeCate(value,index) {
        if(index<0) index = 0;
        this.setState({'selectedCateId':value , 'selectedCateLabel': this.state.cates[index].mscat_libelle });
    }
    closeModalCatesParent(){ this.setState({ 'modalCatesParentVisible':false});   }
    closeModalCates(){  this.setState({ 'modalCatesVisible':false});   }
    selectParentCates(){
        if(this.state.selectedCateParentId == store.getState().getListeCates.catesParent[0].id) this.setState( {selectedCateParentLabel: store.getState().getListeCates.catesParent[0].mscat_libelle } );
        var tri = [];
        this.state.getListeCates.cates.forEach(element => {
            if(element.mscat_parent == this.state.selectedCateParentId)  tri.push(element)
        });
        this.setState({cates:tri , selectedCateId:'All' , cateParentSelected: true, selectedCateLabel: ''});
        this.closeModalCatesParent();
    }
    selectCates(){
        if(this.state.selectedCateId == 'All') this.setState( {selectedCateLabel: 'Toutes les sous-catégories' } );
        this.setState({cateSelected:true});
        this.closeModalCates();
    }
    showResults(){
        if(this.state.cateParentSelected != false && this.state.cp != ''){
        //console.log( "selectedCateParentId="+this.state.selectedCateParentId+"&selectedCateId="+this.state.selectedCateId );
            //////// requete web service ->liste de résultats
            this.setState({'waitWs':true});
            return fetch( 'https://www.myservice-collaboratif.com/app/servicerListe.php' , {
                method : 'POST', 
                headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" },
                body: "selectedCateParentId="+this.state.selectedCateParentId+"&selectedCateId="+this.state.selectedCateId+"&cp="+this.state.cp+"&lat="+this.state.latitude+"&lng="+this.state.longitude
                }
                )
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({waitWs:false});
                    if( responseJson.USER_LISTE.length > 0 ) {
                        this.props.sendResult(responseJson.USER_LISTE)
                        this.props.navigation.navigate('SearchResults');
                    }else{
                        setTimeout(function(){ alert("Nous n'avons trouvé aucun servicer :-/") },300)
                        
                    }
                    return; // responseJson.logged;
                })
                .catch((error) => {
                // console.error(error);
                return false;
            });
        }else{
            alert('Vous devez choisir une catégorie et renseigner un code postal.');
        }
   
    }
    
    

    render(){ 
        if(store.getState()){
            
        
        
                    if(this.state.cateParentSelected==true && this.state.found == false ) var libelleAffinerRecherche = 
                       
                            <View style={styles.textInputStyleWrapper}>
                                <Text style={styles.titleLabel} >Sous-catégorie :</Text>
                                <Text  style={styles.textInputStyle}  onPress={()=>this.setState({modalCatesVisible:true})}  >{this.state.selectedCateLabel}</Text>
                            </View>;
                    else var libelleAffinerRecherche = null;

                        return (
                            <KeyboardAvoidingView
                                behavior="position"
                            >
                            <ScrollView style={{paddingTop:50}} >
                            <View ref="myRef" style={styles.container} >
                                <View style={styles.largeView70} >
                                    <Text style={styles.titleSearch}>Trouver un servicer</Text>
                                </View>
                                <View style={styles.largeView70} >
                                    <View style={styles.textInputStyleWrapper}>
                                        <Text style={styles.titleLabel} >Catégorie :</Text>
                                        <Text style={styles.textInputStyle} onPress={()=>this.setState({modalCatesParentVisible:true})}  >{this.state.selectedCateParentLabel}</Text>
                                    </View>
                                    { /* modale de sélection de catégorie parent */ }
                                    <Modal
                                        visible={this.state.modalCatesParentVisible}
                                        animationType={'slide'}
                                        onRequestClose={() => this.closeModal()}
                                    >
                                        <View  style={styles.titleModal}  >
                                            <Text style={styles.titleModaltext} >Catégories</Text>
                                        </View>
                                        <Picker selectedValue={this.state.selectedCateParentId} onValueChange={(itemValue, itemIndex) => this.onChangeCateParent(itemValue,itemIndex)} >
                                            {this.state.catesParent.map((item, key) => 
                                                <Picker.Item label={item.mscat_libelle} value={item.id} key={key}  />
                                            )} 
                                        </Picker>
                                        <View style={styles.container}>
                                            <View style={styles.largeView70} >
                                                <TouchableHighlight  style={styles.buttonOrange}  onPress={()=>this.selectParentCates()} >
                                                    <Text style={styles.buttonText} > Sélectionner </Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </Modal>
                                    { /* END modale de sélection de catégorie parent */ }
                                    {libelleAffinerRecherche}
                                    { /* modale de sélection de catégorie  */ }
                                    { /* Code postal  */ }
                                    <View style={styles.textInputStyleWrapper}>
                                        <Text style={styles.titleLabel} >Localisation (Code postal) :</Text>
                                        <TextInput ref="InputCp" keyboardType={'numeric'}  style={styles.textInputStyle} maxLength={5} value={this.state.cp} editable={true} onChangeText= {(cp) => this.initTipedCp({cp})} />
                                    </View>
                                    { /* Code postal  */ }
                                    <Modal
                                        visible={this.state.modalCatesVisible}
                                        animationType={'slide'}
                                        onRequestClose={() => this.closeModal()}
                                    >
                                        <View  style={styles.titleModal}  >
                                            <Text style={styles.titleModaltextGrey} >Sous-catégories dans</Text>
                                            <Text style={styles.titleModaltext} >{this.state.selectedCateParentLabel}</Text>
                                        </View>
                                        <Picker selectedValue={this.state.selectedCateId}   onValueChange={(itemValue, itemIndex) => this.onChangeCate(itemValue,itemIndex-1)} >
                                            <Picker.Item label={'Toutes les sous catégories'} value={'All'} key={0}  />
                                            {this.state.cates.map((item, key) => 
                                                <Picker.Item label={item.mscat_libelle} value={item.id} key={key+1}  />
                                            )} 
                                        </Picker>
                                        <View style={styles.container}>
                                            <View style={styles.largeView70} >
                                                <TouchableHighlight  style={styles.buttonOrange}  onPress={()=>this.selectCates()} >
                                                    <Text style={styles.buttonText} > Sélectionner </Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </Modal>
                                    { /* END modale de sélection de catégorie  */ }
                                    
                                    <Modal
                                        visible={this.state.waitWs}
                                        animationType={'slide'}
                                        onRequestClose={() => this.closeModal()}
                                    >
                                        <View style={styles.container}>
                                            <View  style={styles.titleModal}  >
                                                <Text style={styles.titleModaltext} >Recherche....</Text>
                                                <View style={{paddingTop:30}} ><ActivityIndicator size="large" color="#ea654c" /></View>
                                            </View>
                                            
                                        </View>
                                    </Modal>
                                    <TouchableHighlight  style={styles.buttonOrange}  onPress={()=>this.showResults()} >
                                            <Text style={styles.buttonText} > Trouver </Text>
                                    </TouchableHighlight>
                                    

                                </View>
                                    
                            </View>
                            </ScrollView>
                            </KeyboardAvoidingView>
                        

                    );
        }else{
            
            return ( <Text>nop</Text> )
            
           
        }

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
      },
      confirmSlideToServicer : () =>{
        dispatch( confirmShowServicer() );
      }
    }
  }
  
  export default connect (mapSateToProps , mapDispatchToProps)(SearchHome);
//export default SearchHome;