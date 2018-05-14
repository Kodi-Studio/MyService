import { StyleSheet } from 'react-native';

let orange = 'rgba(234, 101, 76, 1)';
let grey = 'rgba(0, 0, 0, 0.5)';
let lightGrey = 'rgba(0, 0, 0, 0.3)';
let superLightGrey  = 'rgba(0, 0, 0, 0.1)';
let yellow = 'rgba(224, 207, 22, 1)';
let white = 'rgba(255, 255, 255, 1)';

export default styles = StyleSheet.create({
    loginTitleBox: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      width: "100%",
      alignItems: 'center',
      padding: 15,
      borderTopLeftRadius : 8,
      borderTopRightRadius : 8
    },
    loginTitleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: lightGrey,
      marginTop: 10 
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    headerStyle: {
      backgroundColor: orange
    },
    headerTitleStyle: {
      color:"#FFFFFF"
    },
    headerHome: {
        backgroundColor:'rgba(255,255,255,0)',
        height:'20%',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
      },
      mainBG: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center'
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      },
      containerLogin: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width:"70%",
        marginHorizontal:"15%"
      },
      input: {
        width: "100%",
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: "center"
      },
      inputTop: {
        width: "100%",
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: "center"
      },
      inputTransp: {
        width: "100%",
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: "left"
      },
      inputTopTransp: {
        width: "100%",
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: "left",
        borderBottomColor: white,
        borderBottomWidth:1
      },
      inputRegister: {
        width: "100%",
        height:50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: "left",
        borderBottomColor: lightGrey,
        borderBottomWidth: 1
      },
      
      buttonBottom: {
        backgroundColor: orange,
        width: "100%",
        height:50,
        alignItems: 'center',
        padding: 15,
        borderBottomLeftRadius : 8,
        borderBottomRightRadius : 8
      },
      buttonTransparent: {
        backgroundColor: 'transparent',
        width: "100%",
        height:50,
        alignItems: 'center',
        padding: 15,
        borderBottomLeftRadius : 8,
        borderBottomRightRadius : 8,
      },
      buttonTextWhite: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFFFFF"
      },
      buttonTextOrange: {
        fontSize: 20,
        fontWeight: 'bold',
        color: orange
      },
      /* inputsText*/
      textInputStyle: {
        height:40,
        width: '100%',
        /*backgroundColor: 'rgba(255, 255, 255, 1)',*/
        fontSize: 22,
        lineHeight:40,
        textAlign: "left",
        justifyContent: 'center',
        alignItems: "stretch",
      },
      textInputStyleWrapper: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(234, 101, 76, 1)',
        width:'100%',
        marginTop:25
      },
      largeView90: {
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
      },
      largeView70: {
        alignItems: 'center',
        justifyContent: 'center',
        width:'70%',
      },
      titleSearch: {
        width: '100%',
        fontSize:30,
        color: orange,
        textAlign: "left"
      },
      buttonWhite: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height:45,
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius : 8,
        borderBottomRightRadius : 8,
        borderTopLeftRadius : 8,
        borderTopRightRadius : 8,
        borderColor: orange,
        marginTop: 25,
      },
      buttonOrange: {
        backgroundColor: orange,
        width: "100%",
        height:45,
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius : 8,
        borderBottomRightRadius : 8,
        borderTopLeftRadius : 8,
        borderTopRightRadius : 8,
        borderColor: orange,
        marginTop: 25
      },
      marginTop30: {
        marginTop: 30
      },
      titleModal: {
        height:'30%',
        marginTop:'10%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      titleModaltext: {
        textAlign:'center',
        fontSize:30,
        color: orange,
      },
      titleModaltextGrey: {
        textAlign:'center',
        fontSize:20,
        color: grey,
      },
      titleLabel: {
        textAlign:'left',
        fontSize:20,
        color: grey,
        paddingVertical:5
      },
      ////////////////// NAV principale
      iconTabNav : {
        /*tintColor: 'rgba(255, 255, 255, 0.9)',*/
        tintColor: 'rgba(234, 101, 76, 1)',
        width:20, 
        height:20, 
        marginTop:3
      },
      listeAvatarWrapper: {
        width:70,
        height:70,
        overflow: "hidden",
        marginRight: 15,
       
      },
      listeAvatar : {
        width:70,
        height:70,
        borderRadius: 35
      },
      listeAvatarSmall : {
        width:50,
        height:50,
        borderRadius: 25
      },
      listeRow: {
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        borderBottomColor: grey,
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF'
      },
      listeColLeft: {

      },
      listeColRight : {

      },
      lineNameTarif : {
        flex:1,
        flexDirection: "row",
        
      },
      rowTarifPrix: {
        color:orange,
        fontSize:20,
        fontWeight: 'bold',
        width:50
      },
      rowName: {
        color: lightGrey,
        fontSize: 18
      },
      rowDescription: {
        marginTop:9
      },
      rowAdress : {
        marginTop:9
      },
      rowStarsWrapper: {
        flex:1,
        flexDirection: 'row',
        marginTop:9
      },
      starYellow : {
        fontSize:14,
        color: yellow
      },
      starGrey : {
        fontSize:14,
        color: superLightGrey
      },
      ///// page servicer screen
      containerTop: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        padding:20,
        flexDirection : 'column'
      },
      sFlexRow: {
        flex:1,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomColor: grey,
        borderBottomWidth: 1,
        paddingVertical: 8,
      },
      sRowLesTopBorder: {
        borderTopWidth: 0,
      },
      sRowLesBottomBorder: {
        borderBottomWidth: 0,
      },
      sRowTopBorderOrange: {
        borderTopWidth: 2,
        borderTopColor: orange
      },
      sFlexCol: {
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-start",
        borderBottomColor: grey,
        borderBottomWidth: 1,
        paddingVertical: 8,
      },
      sAvatar: {
        width:"30%"
      },
      sNom: {
        fontSize: 16
      },
      sLabel: {
        fontWeight: 'bold',
        color: orange,
        fontSize: 15,
        width: "50%"
      },
      BigTitle: {
        fontSize: 18,
        textAlign: 'center'
      },
      sLabelLarge: {
        fontWeight: 'bold',
        color: orange,
        fontSize: 15,
        width: "100%",
        marginBottom: 4
      },
      sCol: {
        width: "50%"
      },
      sColLarge: {
        width: "100%"
      },
      sLabelSub : {
        fontWeight: 'bold',
        color: grey,
        fontSize: 15
      },
      sValue: {
        fontSize: 15,
        color: '#000000'
      },
      sLegend: {
        fontSize: 12,
        color: grey
      },
      iconArrowRightCenter: {
       

      },
      messageFrom: {
        backgroundColor:orange,
        padding:20 ,
        borderWidth: 0,
        borderRadius: 12,
        marginTop: 5,
        marginHorizontal: 15,
        marginLeft:"5%",
        marginRight: "20%",
        width: '80%'
      },
      messageTo: {
        backgroundColor:'#FFFFFF',
        padding: 20 ,
        borderRadius: 12,
        borderWidth: 0,
        borderColor: orange,
        marginTop: 5,
        marginLeft:"15%",
        marginRight: "5%",
        width: '80%'
      },
      messageTextWhite: {
        color: "#ffffff" , fontSize: 16
      },
      messageTextOrange: {
        color: orange , fontSize: 16,
      },
      messageTime: {
        textAlign: "center",
        color: grey,
        marginTop: 12,
        marginBottom: 6
      },
      btnOrangeSmall: {
        backgroundColor:orange,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:15
      },
      btnOrangeTxt: {
        color:"#fff",
        fontSize:20,
      },
      ////// MODALS
      modalHeader: {
        flexDirection:'row',
        padding: 12,
        justifyContent: "space-between",
        marginTop: 30
      },
      modalHeaderClose: {
        width: 28,
        height:28,
        tintColor: orange
      },
      modalHeaderLabel: {
        fontSize:14,
        paddingVertical:7,
        color: orange
      }

  });
  