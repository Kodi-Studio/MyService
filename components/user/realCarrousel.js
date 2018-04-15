import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, Dimension, Animated, Easing, Dimensions, PanResponder} from 'react-native';

import styles from '../../styles/globalStyles';



export default class realCarrousel extends React.Component {
   
   
    
    
    constructor(props) {
        super(props);
        let {width} = Dimensions.get('window');
        this.state = {
            width:width-20,
            translate: new Animated.Value(0),
            nb: this.props.images.length
        }  
    }

    componentWillMount () {

        var startPosx = 0;
        var newPosx = 0;
        var indexSelected = 1;

        moveSlide = (dx) => {
            if(dx < -20 ){
                if( startPosx - this.state.width < 0-( this.state.width*(this.state.nb-1) )  ){
                    newPosx = 0-this.state.width*(this.state.nb-1);
                    startPosx = newPosx;
                }else{
                    newPosx = startPosx - this.state.width;
                    startPosx = newPosx;
                }
            }
            else if(dx > 20 ){
                if( startPosx + this.state.width  > 0 ){
                    newPosx = 0;
                    startPosx = newPosx;
                }else{
                    newPosx = startPosx + this.state.width;
                    startPosx = newPosx;
                }
               
            }else {
                newPosx = startPosx
            }

          
            Animated.timing(
                this.state.translate,
                {
                    toValue: newPosx,
                    duration: 150,
                    easing: Easing.in(),
                    useNativeDriver: true
                }
            ).start();
        }


        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState) > 7,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTernationRequest: () => true,
            onPanResponderMove: (evt, gestureState) => {
                
                newPosx = startPosx + gestureState.dx;
                this.state.translate.setValue( newPosx );
            },
            onPanResponderStart: (evt, gestureState) => {
                //startPosx = newPosx;
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderEnd: (evt, gestureState)=>{
                moveSlide(gestureState.dx);
            },
            onPanResponderTerminate: (evt, gestureState)=>{
                moveSlide(gestureState.dx);
            },
           
            onShouldBlockNativeReponser: (evt, gestureState) => true
        })
    }

    getStyle () {
        return {
            image: {
                width: this.state.width,
                height: 200
            },
            imageContainer: {
                flexDirection: 'row',
                width: this.state.width*this.state.nb,
                height: 200,
                marginBottom: 12,
                overflow:'hidden',
                transform: [{
                    translateX: this.state.translate
                  }]
            },
            scrolller: {
                flexDirection: 'row',
                width: this.state.width,
                height: 200,
                overflow:'hidden'
            }
        }
    }


    render(){ 

        const carStyle = this.getStyle();

        return (
            
            <Animated.View {...this.panResponder.panHandlers} style={carStyle.imageContainer} >
                {this.props.images.map( (urlImage, k )=>{

                    return (

                        <Image style={carStyle.image}  key={k}   source={{uri:urlImage}} />
                    
                    )

                } )}

            </Animated.View>
            
            

        )

    }
}