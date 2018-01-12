import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, Picker, Modal } from 'react-native';

import { AutoComplete } from 'react-native-autocomplete-input'


class SearchHome extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.state = {
            ...this.state,
            'PickerValueHolder':'',
            'listeCates': '',
            'modalCatesParentVisible': false,
            'selectedCateParentLabel': 'Catégorie',
            'selectedCateParentId': '',
            'selectedCateLabel' : 'Sous Catégirie',
            'selectedCateId' : '',
        }

    }

    componentDidMount() {
    //
    }
    onTyping(text) {
        ///
    }
    onChange(value,index) {
        ///
        //alert( this.state.getListeCates.catesParent[index].mscat_libelle );
        this.setState({'PickerValueHolder':value , 'selectedCateParentId':value , 'selectedCateParentLabel': this.state.getListeCates.catesParent[index].mscat_libelle });
    }
    closeModalCatesParent(){
        this.setState({ 'modalCatesParentVisible':false});
        //alert( this.state.PickerValueHolder );
    }
    showResults(){
        alert('on lance la recherche');
    }
    render(){ 
        return (
            <View>
                <Text>Rechercher un servicer :</Text>
                <View>
                    <Text onPress={()=>this.setState({'modalCatesParentVisible':true})}  >{this.state.selectedCateParentLabel}</Text>

                    { /* modale de sélection de catégorie parent */ }
                    <Modal
                        visible={this.state.modalCatesParentVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <Picker selectedValue={this.state.PickerValueHolder}   onValueChange={(itemValue, itemIndex) => this.onChange(itemValue,itemIndex)} >
                            {this.state.getListeCates.catesParent.map((item, key) => 
                                <Picker.Item style={{'fontWeight':'bold'} } label={item.mscat_libelle} value={'mscat_parent-'+item.id} key={key}  />
                            )} 
                        </Picker>
                        <Button onPress={()=>this.closeModalCatesParent()} title='Valider'   />
                    </Modal>
                    { /* END modale de sélection de catégorie parent */ }

                    <Button title={"Trouver.."} onPress={()=>this.showResults()} />

                </View>
                    
            </View>

        );

    };
}

export default SearchHome;