import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image } from 'react-native';

import { AutoComplete } from 'react-native-autocomplete-input'


class SearchHome extends React.Component {
    
      constructor(props) {
          super(props);
          this.state = store.getState();
      }
      onTyping(text) {
          ///
      }
      onSelect() {
         ///
      }
    
      render(){ 

        console.log(store.getState());

        return (

            <View>
                <Text>Search for a country</Text>
            </View>

        );

      };
}

export default SearchHome;