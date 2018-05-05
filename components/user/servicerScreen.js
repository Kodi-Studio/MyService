import React from 'react';
import { ScrollView, StyleSheet, Text, View , TextInput, Button, TouchableHighlight, ImageBackground, Image, Modal, Picker, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
/// composants IOS
import { DatePickerIOS } from 'react-native';

import styles from '../../styles/globalStyles';

import { jsxUser } from '../../methods/userMethods';

import RealCarrousel  from '../user/realCarrousel.js';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import { connect } from 'react-redux';
import { initDateDemande } from '../../store/action';



class ServicerScreen extends React.Component {
    static navigationOptions = {
        title : 'Résultats',
        tabBarIcon: () => (
            <Image
              source={require('../../assets/pictos/magnifying-glass.png')}
              style={[styles.iconTabNav]}
            />
          ),
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTintColor: '#ffffff',
    }
    constructor(props) {
        super(props);
        console.log(this.props.navigation);
        this.state = {
            user: store.getState().selectedServicer.datas,
            modalDate: false,
            modalHoure: false,
            modalDuring: false,
            selectedDate:  this.todayTimestamp(),
            selectedDateString: this.today(),
            selectedHour: new Date(),
            selectedHourString: '',
            selectedDuring:1,
            selectedDuringString:'1h',
            chosenDate: new Date(),
            maxDate: new Date('2018-02-05'),
            tabDuring:[
                    ["1", "1"],
                    ["1.5", "1h30"],
                    ["2", "2h"],
                    ["2.5", "2h30"],
                    ["3", "3h"],
                    ["3.5", "3h30"],
                    ["4", "4h"],
                    ["4.5", "4h30"],
                    ["5", "5h"],
                    ["5.5", "5h30"],
                    ["6", "6h"],
                    ["6.5", "6h30"],
                    ["7", "7h"],
                    ["7.5", "7h30"],
                    ["8", "8h30"]
            ],
            prestaDetails: '',
            waitWs: false,
            modalSendingText: "Envoie de votre demande en cours...",
            actionBeforeAfterMessage: <View style={{paddingTop:30}} ><ActivityIndicator size="large" color="#ea654c" /></View>

            

        };
        let b =  (this.state.user.booked !='') ?  JSON.parse(this.state.user.booked) :[];
        let booked = new Array();
        b.map((item , index)=>{  
            n = item.date.split('/');
            n = n.reverse();
            if(n[1]<10){ n[1] = '0'+n[1] };
            if(n[2]<10){ n[2] = '0'+n[2] };
            booked[index] = [ n.join('-') ,  {disabled: true, textColor:"#fff", color: "rgba(0, 0, 0, 0.10)"} ]   



        });
        this.state.booked = Object.assign({} , ...booked.map(d => ({[d[0]]: d[1]})))
       
        this.onDayPress = this.onDayPress.bind(this);
        this.setHour = this.setHour.bind(this);
        this.backToresultes = this.backToresultes.bind(this);

    }
    componentDidMount() {
        var d = new  Date();
        this.setHour(d);
    }
    
    onDayPress(e){
        this.setState({'selectedDate':e.timestamp , 'selectedDateString':e.dateString})
    };
    setHour(newDate){
        console.log(newDate);
        let d = new Date(newDate);
       // this.setState({'selectedHour': newDate})
        // (d.getMinutes()<10)? '0'+d.getMinutes() : d.getMinutes() ;
        m = d.getMinutes();
        if(m == 0 ) { m = "00" }
        else if(m <15 ) { m = '00' }
        else if (m <30 ) { m = '15' }
        else if (m <45 ) { m = '30' }
        else if (m <=59 ) { m = '45' }
        this.setState({selectedHourString: d.getHours()+'h'+m , selectedHour: newDate })
    }
    /////*
    closeModalDate() {
       this.setState({'modalDate':false});
    }
    closeModalHoure(e)  {
        this.setState({'modalHoure':false});
    }
    closeModalDuring(e)  {
        this.setState({'modalDuring':false});
    }
    openModalHoure(){
        let d = new Date();
        this.setHour(d);
         this.setState({'modalHoure':true});
    }
    //
    onChangeDuring(itemValue,itemIndex){
       
        this.setState({'selectedDuring':itemValue  , 'selectedDuringString':this.state.tabDuring[itemIndex][1] });
    }
   
    today = () => {
        let d = new Date();
        m = d.getMonth()+1;
        return d.getFullYear()+'-'+m+'-'+d.getDate();
    }
    todayTimestamp = () => {
        return new Date().getTime();
    }
    frStringDate = (dateString) => {
        var d = dateString.split('-').reverse().join('/');
        return d;
    }
    frStringHour = (hourString) => {
        var h = hourString.split(':').reverse().join('/');
        return h;
    }

    sendDemande() {
        /*
        $demande = new stdClass();
		  $demande->hourTime = $_POST['formHour'];
		  $demande->during = $_POST['during'];
		  $demande->hourPrice = $_POST['hourPrice'];
		  $demande->prestaDetails = $_POST['prestaDetails'];
		  $demande->price = $_POST['prestaPrice'];
		  $demande->dateTime = $_POST['formDate'];
		  $demande->idPrestataire = $_SESSION['prestataire'];
		  $demande->idClient = $_SESSION['userMs']->id;
		  $demande->typePrestation = $_POST['typePrestation'];
		  $demande->adressePrestation = $adressePrestation;
		  $demande->dateDemande = time();
		  $demande->statu = 'wait';
        */
        //console.log(store.getState())
        let body = "formHour="+this.state.selectedHourString+
            "&during="+this.state.selectedDuringString+
            "&hourPrice="+this.state.user.tarifs+
            "&prestaDetails="+encodeURI(this.state.prestaDetails)+
            "&prestaPrice="+this.state.user.tarifs*this.state.selectedDuring+
            "&formDate="+this.state.selectedDate+
            "&userMs="+store.getState().getUserDatas.userDatas.id+
            "&typePrestation="+this.state.user.cateSelected+
            "&idPrestataire="+this.state.user.id+
            "&destinataire="+this.state.user.id+
            "&adressePrestation"+this.state.user.cp
        console.log(body);
        this.setState({waitWs:true});
        return fetch( "https://www.myservice-collaboratif.com/app/sendRequest.php" , {
            method : 'POST', 
            headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" },
            body : "formHour="+this.state.selectedHourString+
            "&during="+this.state.selectedDuringString+
            "&hourPrice="+this.state.user.tarifs+
            "&prestaDetails="+encodeURI(this.state.prestaDetails)+
            "&prestaPrice="+this.state.user.tarifs*this.state.selectedDuring+
            "&formDate="+this.state.selectedDate+
            "&userMs="+store.getState().getUserDatas.userDatas.id+
            "&typePrestation="+this.state.user.cateSelected+
            "&idPrestataire="+this.state.user.id+
            "&adressePrestation="+this.state.user.cp+
            "&prenomClient="+store.getState().getUserDatas.userDatas.prenom+
            "&prenomPresta="+this.state.user.prenom+
            "&mailPresta="+this.state.user.email
            }
            )
            .then((response) => response.json())
            .then((responseJson) => {
               ///this.setState({cp:responseJson.results[2].address_components[0].long_name})
               console.log(responseJson);
              let btn =  
                            <View style={styles.largeView70} >
                                <TouchableHighlight  style={styles.buttonOrange}  onPress={()=>this.backToresultes()} >
                                    <Text style={styles.buttonText} > OK </Text>
                                </TouchableHighlight>
                            </View>;
               this.setState({ actionBeforeAfterMessage: btn , modalSendingText: "Votre demande à été envoyée."});
            })
            .catch((error) => {
            // console.error(error);
            return false;
        });
    }

    backToresultes() {
        this.props.navigation.goBack();
        this.setState({waitWs:false});
        this.setState({ actionBeforeAfterMessage: <View style={{paddingTop:30}} ><ActivityIndicator size="large" color="#ea654c" /></View> , modalSendingText: "Envoie de votre demande."});
       // setTimeout(function() { /*this.props.navigation.navigate('SearchResults')*/ console.log('props :')  }, 500 );
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

        //console.log(store.getState())

        LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
          };
          LocaleConfig.defaultLocale = 'fr';
          let selectedDate = () => { return store.getState().demandeDate.date.dateString }

          console.log( store.getState() );

    
    return (

       
<KeyboardAvoidingView
                behavior="position"
                >
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

                <View  style={[styles.sFlexRow,styles.sRowLesBottomBorder ]} >
                    <Text style={styles.sLabelLarge} >Réalisations : </Text>
                </View>
                <View  style={[styles.sRowLesTopBorder,{overflow:'hidden'} ]} >
                   
                    <RealCarrousel images={listeReals} />
                   
                </View>
                <View  style={[styles.sFlexCol,styles.sRowLesBottomBorder, styles.sRowTopBorderOrange ]} >
                    <Text style={[styles.sLabelLarge , styles.BigTitle]} >Demande réservation : </Text>
                    <View style={styles.sColLarge} >
                        <View style={styles.textInputStyleWrapper}>
                            <Text style={styles.titleLabel} >Date :</Text>
                            <Text style={styles.textInputStyle} onPress={()=>this.setState({modalDate:true})}  >{ this.frStringDate( this.state.selectedDateString)}</Text>
                        </View>
                    </View>
                </View>
                <View  style={[styles.sFlexRow,styles.sRowLesBottomBorder, styles.sRowLesTopBorder ]} >
                    <View  style={styles.sCol} >
                        <View style={styles.textInputStyleWrapper}>
                            <Text style={styles.titleLabel} >Heure :</Text>
                            <Text style={styles.textInputStyle} onPress={()=>this.openModalHoure()}  >{this.state.selectedHourString}</Text>
                        </View>
                    </View>
                    <View  style={styles.sCol} >
                        <View style={styles.textInputStyleWrapper}>
                            <Text style={styles.titleLabel} >Durée :</Text>
                            <Text style={styles.textInputStyle} onPress={()=>this.setState({modalDuring:true})}  >{this.state.selectedDuringString}</Text>
                        </View>
                    </View>
                </View>

               <View  style={[styles.sFlexCol,styles.sRowLesBottomBorder, styles.sRowLesTopBorder ]} >
                    <View  style={styles.sColLarge} >
                        <View style={[styles.textInputStyleWrapper , styles.sRowLesBottomBorder]}>
                            <Text style={styles.titleLabel} >Précisez votre demande :</Text>
                            <TextInput style={{borderWidth:1, width:'100%', height:100, marginBottom:15, marginTop:15, paddingHorizontal:10, fontSize:16}}
                                editable = {true}
                                multiline= {true}
                                maxLength = {250}
                                placeholder = "Apportez quelques détails sur vos besoins..."
                                onChangeText={(prestaDetails) => this.setState({prestaDetails})}
                            />
                        </View>
                    </View>
                    <TouchableHighlight  style={styles.buttonOrange}  onPress={()=>this.sendDemande()} >
                                            <Text style={styles.buttonText} > ENVOYER </Text>
                    </TouchableHighlight>
                </View>
                

                
            </View>

            <Modal
                visible={this.state.modalHoure}
                animationType={'slide'}
            >
                <View  style={styles.titleModal}  >
                    <Text style={styles.titleModaltextGrey} >Horaire le</Text>
                    <Text style={styles.titleModaltext} >{this.frStringDate( this.state.selectedDateString )}</Text>
                </View>
                <DatePickerIOS
                    ref="pickerHour"
                    date={ this.state.selectedHour}
                    onDateChange={this.setHour}
                   // maximumDate={this.state.maxDate}
                    mode={'time'}
                    minuteInterval={15}
                />
                <View style={styles.container}>
                    <View style={styles.largeView70} >
                        <TouchableHighlight  style={styles.buttonOrange}  onPress={()=>this.closeModalHoure()} >
                            <Text style={styles.buttonText} > Valider </Text>
                        </TouchableHighlight>
                    </View>
                </View>


            </Modal>

            <Modal
                visible={this.state.modalDuring}
                animationType={'slide'}
            >
                <View  style={styles.titleModal}  >
                    <Text style={styles.titleModaltext} >Durée estimée</Text>
                </View>
                <Picker selectedValue={this.state.selectedDuring}   onValueChange={(itemValue, itemIndex) => this.onChangeDuring(itemValue,itemIndex)} >
                    {this.state.tabDuring.map((item, key) => 
                       <Picker.Item label={item[1]} value={item[0]} key={key}  />
                    )} 
                </Picker>
                <View style={styles.container}>
                    <View style={styles.largeView70} >
                        <TouchableHighlight  style={styles.buttonOrange}  onPress={ ()=>this.closeModalDuring() } >
                            <Text style={styles.buttonText} > Valider </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            
            <Modal
                visible={this.state.modalDate}
                animationType={'slide'}
                onRequestClose={() => this.modalResa(false)}
                style={{paddingHorizontal:20, paddingVertical:20}} 
                >
                    <Text style={styles.titleModaltext} >Sélectionnez une date :</Text>
                    <View style={styles.container}>
                    <Calendar
                    onDayPress={this.onDayPress}
                    style={styles.calendar}
                    //current={this.state.selectedDateString}
                    minDate={this.today}
                    displayLoadingIndicator={true}
                    markingType={'period'}
                    monthFormat={'MMM yyyy'}
                    dayFormat={"dd mm yyyy"}
                    firstDay={1}
                    theme={{
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#000000',
                        dayTextColor: 'rgba(234, 101, 76, 1)',
                        todayTextColor: 'rgba(0, 0, 0, 0.1)',
                        selectedDayTextColor: 'white',
                        monthTextColor: 'rgba(234, 101, 76, 1)',
                        //selectedDayBackgroundColor: 'rgba(234, 101, 76, 1)',
                        selectedDayBackgroundColor: '#00adf5',
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
                    markedDates={ {...this.state.booked,
                        [this.state.selectedDateString]: {disabled: true, color: "rgba(234, 101, 76, 1)", textColor: '#FFF', selected: true}/*,
                        '2018-02-10': {disabled: true, textColor:"#fff", color: "rgba(234, 101, 76, 1)"},
                        '2018-02-08': {textColor: '#666'},
                        '2018-02-09': {textColor: '#666', backgroundColor: "#000000"},
                        '2018-02-14': {startingDay: true, color: 'blue', endingDay: true},
                        '2018-02-21': {startingDay: true, color: 'blue'},
                        '2018-02-22': {endingDay: true, color: 'gray'},
                        '2018-02-24': {startingDay: true, color: 'gray'},
                        '2018-02-25': {color: 'gray'},
                    '2018-02-26': {endingDay: true, color: 'gray'}*/}}
                    hideArrows={false}
                    />
                    
                </View>
                <View style={styles.container}>
                    <View style={styles.largeView70} >
                        <TouchableHighlight  style={styles.buttonOrange}  onPress={ ()=>this.closeModalDate('modalDate') } >
                            <Text style={styles.buttonText} > Valider </Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </Modal>


            <Modal
                visible={this.state.waitWs}
                animationType={'slide'}
                onRequestClose={() => this.closeModal()}
            >
                <View style={styles.container}>
                    <View  style={styles.titleModal}  >
                        <View style={{paddingTop:30}} >
                            <Text style={styles.titleModaltext} >{this.state.modalSendingText}</Text>
                        </View>
                        {this.state.actionBeforeAfterMessage}
                    </View>
                    
                </View>
            </Modal>
        
       
    </ScrollView>
     </KeyboardAvoidingView>
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
      defineDate: (date) => {
          alert('choosedate');
        dispatch( initDateDemande(liste) ) ;
      }
    }
  }
  
  export default connect (mapSateToProps , mapDispatchToProps)(ServicerScreen);