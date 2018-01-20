import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';

import styles from '../../styles/globalStyles';


export default class UserRow extends React.Component {
    
      constructor(props) {
          super(props);
          console.log(this.props);
      }
     

      render(){ 


        return (
            <View>
               <Text>Nom : {this.props.datas.nom}</Text>
            </View>
        );

      };
}