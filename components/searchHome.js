import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image } from 'react-native';

import { Autocomplete } from 'react-native-autocomplete-input'


class SearchHome extends React.Component {
    
      constructor(props) {
          super(props);
          this.state = {
              data: store.getState()
              }
      }
     
    
      render(){ 

        console.log(store.getState());

        return (

            <Autocomplete
                data={data}
                defaultValue={query}
                onChangeText={text => this.setState({ query: text })}
                renderItem={data => (
                <TouchableOpacity onPress={() => this.setState({ query: data })}>
                    <Text>{data}</Text>
                </TouchableOpacity>
                )}
            />

        );

      };
}

export default SearchHome;