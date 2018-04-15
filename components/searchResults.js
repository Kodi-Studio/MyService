import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ListView, Image} from 'react-native';

import styles from '../styles/globalStyles';

import { connect } from 'react-redux';
import { initDateDemande } from '../store/action';

import UserRow from '../components/user/userRow';

class SearchResults extends React.Component {
    
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

      componentDidMount(){
        this.props.removeDemand();
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

const mapSateToProps = (state) => {
    return {
      login: state.login,
      pass: state.pass
    }
  }
  const mapDispatchToProps = (dispatch) => {
  
    return {
      removeDemand: () => {
        dispatch( initDateDemande({},null) ) ;
      }  
    }
  }
  
  export default connect (mapSateToProps , mapDispatchToProps)(SearchResults);
