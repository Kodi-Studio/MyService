import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';



class ProfileScreen extends React.Component {
    static navigationOptions = {
        title : 'Profil',
        tabBarIcon: () => (
            <Image
                source={require('../assets/pictos/avatar.png')}
                style={[styles.iconTabNav]}
            />
            ),
    }
    
      constructor(props) {
          super(props);
      }

    
      render(){ 

        return (

            <View>
                <Text>My profile</Text>
            </View>

        );

      };
}

export default ProfileScreen;