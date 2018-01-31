import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ListView, Image} from 'react-native';

import styles from '../styles/globalStyles';

import UserRow from '../components/user/userRow';


export default class SearchResults extends React.Component {
    
      static navigationOptions = {
        title : 'Résultats',
        tabBarIcon: () => (
            <Image
              source={require('../assets/pictos/magnifying-glass.png')}
              style={styles.iconTabNav}
            />
          ),
      }

      constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          report: ds.cloneWithRows(store.getState().getListeUsersFound.listeUsers),
        };
      }
      render(){ 

        return (

                <ListView
                    dataSource={this.state.report}
                    renderRow={(rowData) =>
                       <UserRow datas={rowData}   />
                    }
                />
            
        );

      };
}
/*
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
*/