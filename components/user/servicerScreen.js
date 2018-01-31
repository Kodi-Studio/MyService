import React from 'react';
import { ScrollView, StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image} from 'react-native';

import styles from '../../styles/globalStyles';

import { jsxUser } from '../../methods/userMethods';

import RealCarrousel  from '../user/realCarrousel.js';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';


export default class ServicerScreen extends React.Component {
    static navigationOptions = {
        title : 'Recherche',
        tabBarIcon: () => (
            <Image
              source={require('../../assets/pictos/magnifying-glass.png')}
              style={[styles.iconTabNav]}
            />
          ),
    }
    constructor(props) {
        super(props);
        this.state = {
            user: store.getState().selectedServicer.datas
        };
        
        console.log('details du servicer :');
        console.log(this.state);
    }

    onDayPress(e){
        console.log(e);
    };

    today = () => {
        let d = new Date();
        alert(  d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate() );
        return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
    }

    render(){ 
        //// definition de l'avatar
        var s = this.state.user;
        var userJsx = new jsxUser( );
        avatar = userJsx.jsxAvatar('../../', s.sexe ,s.avatar);
        stars = userJsx.jsxStars(s.nb_stars);
        registrationDate = userJsx.getRegisterDate(s.date_inscription)
        
        listeReals =[
            'https://www.myservice-collaboratif.com/nodimer/uploads/2018/01/fm080604-101-l750-h512.jpg',
            'https://www.myservice-collaboratif.com/nodimer/uploads/2018/01/Lawn-stripey-1mg1.jpg',
            'https://www.myservice-collaboratif.com/nodimer/uploads/2018/01/grands_cerlces-590x332.jpg'
        ];


    return (

        

        <ScrollView>
            <View style={styles.containerTop} >
                <View style={styles.sFlexRow}>
                    <View style={styles.sAvatar} >
                        <View >{avatar}</View>
                        <View>{stars}</View>
                    </View>
                    <View>
                        <Text style={styles.sNom}>{s.prenom+' '+s.nom}</Text>
                        <Text style={styles.sValue}>{s.cp}</Text>
                        <Text style={styles.sValue}>{s.ville}</Text>
                    </View>
                </View>
                <View style={styles.sFlexRow} >
                    <Text style={styles.sLabel} >Membre depuis le :</Text>
                    <Text style={styles.sValue}>{registrationDate}</Text>
                </View>
                <View style={styles.sFlexRow} >
                    <Text style={styles.sLabel} >Tarif :</Text>
                    <View>
                        <Text style={styles.sValue} >{s.tarifs} €/Heure</Text>
                        <Text style={styles.sLegend} >(validation sur demande)</Text>
                    </View>
                </View>
                <View style={styles.sFlexRow} >
                    <View style={styles.sCol} >
                        <Text style={styles.sLabelLarge} >Notes :<Text style={styles.sLegend} >({s.nb_notes} avis exprimé{(s.nb_notes>1)?'s':''})</Text></Text>
                        <Text style={styles.sLabelSub} >Accueil :</Text>
                        <Text style={styles.sValue} >{userJsx.jsxStars(s.noteAccueil)}</Text>
                        <Text style={styles.sLabelSub} >Disponibilié :</Text>
                        <Text style={styles.sValue} >{userJsx.jsxStars(s.noteDispo)}</Text>
                        <Text style={styles.sLabelSub} >Qualité / Prix :</Text>
                        <Text style={styles.sValue} >{userJsx.jsxStars(s.noteQualiteprix)}</Text>
                    </View>
                    <View style={styles.sCol} >
                        <Text style={styles.sLabelLarge} ></Text>
                        <Text style={styles.sLabelSub} >Efficacité :</Text>
                        <Text style={styles.sValue} >{userJsx.jsxStars(s.noteEfficacite)}</Text>
                        <Text style={styles.sLabelSub} >Communication :</Text>
                        <Text style={styles.sValue} >{userJsx.jsxStars(s.noteProprete)}</Text>
                        <Text style={styles.sLabelSub} >Avis général :</Text>
                        <Text style={styles.sValue} >{userJsx.jsxStars(s.noteAvis)}</Text>
                    </View>
                </View>

                <View  style={[styles.sFlexRow,styles.sRowLesTopBorder ]} >
                    <Text style={styles.sLabelLarge} >Réalisations : </Text>
                </View>
                <View  style={[styles.sRowLesTopBorder,{overflow:'hidden'} ]} >
                   
                    <RealCarrousel images={listeReals} />
                   
                </View>
                <View style={[styles.sFlexCol]} >
                    <Text style={styles.sLabelLarge} >Réservation :</Text>
                    <View style={{width:'100%'}} >

                    <Calendar
                        onDayPress={this.onDayPress}
                        style={styles.calendar}
                        current={this.today}
                        minDate={this.today}
                        displayLoadingIndicator={false}
                        markingType={'period'}
                        theme={{
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#000000',
                            dayTextColor: 'rgba(234, 101, 76, 1)',
                            todayTextColor: 'rgba(0, 0, 0, 0.1)',
                            selectedDayTextColor: 'white',
                            monthTextColor: 'rgba(234, 101, 76, 1)',
                            selectedDayBackgroundColor: 'rgba(234, 101, 76, 1)',
                            arrowColor: 'rgba(234, 101, 76, 1)',
                            // textDisabledColor: 'red',
                            disabledDayBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                            'stylesheet.calendar.header': {
                            week: {
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }
                            }
                        }}
                        markedDates={{
                            '2012-05-17': {disabled: true, backgroundColor: "#000000"},
                            '2012-05-08': {textColor: '#666'},
                            '2012-05-09': {textColor: '#666'},
                            '2012-05-14': {startingDay: true, color: 'blue', endingDay: true},
                            '2012-05-21': {startingDay: true, color: 'blue'},
                            '2012-05-22': {endingDay: true, color: 'gray'},
                            '2012-05-24': {startingDay: true, color: 'gray'},
                            '2012-05-25': {color: 'gray'},
                            '2012-05-26': {endingDay: true, color: 'gray'}}}
                        hideArrows={false}
                        />



                    </View>
                </View>
                

                
            </View>
           
        
       
    </ScrollView>
    );

    };
}