import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ListView, Image} from 'react-native';

import styles from '../styles/globalStyles';

import UserRow from '../components/user/userRow';


export default class SearchResults extends React.Component {
    
      /*constructor(props) {
          super(props);
          console.log(this.props.navigation.state);
          this.setState{} = 
      }*/

      constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          report: ds.cloneWithRows(store.getState().getListeUsersFound.listeUsers),
        };
        console.log(store.getState());

        //console.log(store.getListeUsersFound.listeUsers);

      }

      render(){ 

        return (

                <ListView
                    dataSource={this.state.report}
                    renderRow={(rowData) => <UserRow datas={rowData} />}
                />
            
        );

      };
}
