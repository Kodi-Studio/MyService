import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

import styles from '../styles/globalStyles';

export class jsxUser  {

    constructor (){
        this.img = '';
    }

    jsxAvatar(path , sexe, avatar){
        this.path = path;
        this.sexe = sexe;
        this.avatar =  avatar;
        if(this.avatar == '') {
          
            switch (this.sexe){
                case 'f':
                imgPath = this.path+'assets/avatar_femme.jpg';
                this.img = <Image style={styles.listeAvatar} source={require('../assets/avatar_femme.jpg')} />;
                break;
                case 'h':
                imgPath = this.path+'assets/avatar_homme.jpg';
                this.img = <Image style={styles.listeAvatar} source={require('../assets/avatar_homme.jpg')} />;
                break;
            }
        }else{
            var url = this.avatar;
            this.img = <Image style={styles.listeAvatar} source={{uri:url}} />;
        }
        return this.img;

    }

    jsxStars(nb){
        let ns = nb;
        let arrayStars = new Array();
        for(i=1; i<6; i++ ){
            if(i<=ns) arrayStars.push(styles.starYellow);
            else arrayStars.push(styles.starGrey);
        }


        return  <Text>
                    <Text style={arrayStars[0]} >&#x2605;</Text>
                    <Text style={arrayStars[1]} >&#x2605;</Text>
                    <Text style={arrayStars[2]} >&#x2605;</Text>
                    <Text style={arrayStars[3]} >&#x2605;</Text>
                    <Text style={arrayStars[4]} >&#x2605;</Text>
                </Text>
                

    }

    getRegisterDate(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' ;
        return time;
    }

}
