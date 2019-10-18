import React from 'react'
import {
    View,
    PanResponder,
    Text,
    Animated,
    Easing 
} from "react-native"
import { colors } from './style'

export default class CustomSlider extends React.Component{

    animatedX = new Animated.Value(0)

    state={
        x : this.animatedX,
        originalX:0,
        maxValuePosition: 0,
        value : 0,
        maxValue : 100
    }


    setState(newState){
        if(newState.value != this.state.value && this.props.steps.length==0){
            //this.props.onChangeValue(newState.value)
            this.props.onSeek(newState.value)
        }
        super.setState(newState);
    }
    calculateValue( position ){
        let r = position / this.state.maxValuePosition
        let value = this.state.maxValue * r

        if(this.props.intValue){
            value = Math.round(value)
        }
       
        return value;
    }

    shouldRecalculateValue(){
        let value = this.state.value

        if( this.props.steps.length > 0 ){
            let min = 999999999
            let currentValue = value;
            let animateTo = 0;
           
            let steps = [
                {
                    value : 0,
                    position: 0
                },
                ...this.props.steps,
                {
                    value: this.state.maxValue,
                    position: 1
                }
            ]

            steps.forEach( s => {
                let m = (value > s.value )? value - s.value : s.value - value
                if( m < min ){
                    min = m
                    currentValue = s.value
                    animateTo = this.state.maxValuePosition * (s.value / this.state.maxValue )
                }
            });

            
            if( currentValue != value ){
                Animated.timing(
                    this.animatedX,
                    {
                        toValue : animateTo,
                        duration: 150,
                        easing:Easing.elastic(1.2),
                        useNativeDriver: true
                    }
                ).start();
                //this.props.onChangeValue(currentValue)
                //this.props.onSeek(currentValue)
                value = currentValue;
                this.setState({
                    value : currentValue
                })
            }
        }

        this.props.onChangeValue(value)
    }
    constructor(props){
        super(props)
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderEnd: ()=>{
                this.shouldRecalculateValue();
            },
            onPanResponderStart: (event,gesture) =>{
                this.animatedX.setValue(event.nativeEvent.locationX)
                this.setState({
                    //x: event.nativeEvent.locationX,
                    originalX : event.nativeEvent.locationX,
                    value : this.calculateValue(event.nativeEvent.locationX)
                })
            },
            onPanResponderMove: (event, gesture) => {
                let x = this.state.originalX + gesture.dx;
                x = x > 0 ? x : 0
                x = x <= this.state.maxValuePosition ? x : this.state.maxValuePosition

                this.animatedX.setValue(x)
                this.setState({
                    //x,
                    value : this.calculateValue(x)
                })
            }
        })
    }

    
    render(){
        return (
            <View onLayout={(event)=>{
                var {width} = event.nativeEvent.layout;
                this.setState({
                    maxValuePosition : width - 30
                })
            }} {...this.panResponder.panHandlers} style={{
                height: 50,
                justifyContent:"center"
            }}>

                
                <View style={{
                    height: 10,
                    backgroundColor: colors.grey2,
                    borderRadius: 5,
                    marginHorizontal: 15
                }}>
                </View>

                {this.props.steps.map(s=>{
                    return (<View pointerEvents="none"  style={{
                        position: "absolute",
                        left: this.state.maxValuePosition * (s.value / this.state.maxValue),
                        height: 40,
                        width: 4,
                        marginLeft: 13,
                        backgroundColor : colors.grey2
                    }}>
                        <Text style={{
                            position: "absolute",
                            top:80,
                            left: 0,
                            height: 30,
                            width: 50,
                            marginLeft : -23,
                            textAlign: "center",
                            fontSize: 10,
                            lineHeight: 10,
                            fontWeight: "bold",
                            textAlignVertical:"bottom",
                            color : colors.grey1,

                            transform:[
                                {
                                    translateY : -30
                                }
                            ]
                        }}>{s.label}</Text>
                    </View>)
                })}
                <Animated.View pointerEvents="none"  style={{
                        position:"absolute",
                        // ...this.props.defaultValue,                        
                        transform: [
                            {
                                translateX : this.state.x
                            }
                        ],
                        ...this.props.handlerStyle
                    }}>
                  
                </Animated.View>

                
            </View>
        )
    }
}


CustomSlider.defaultProps = {
    handlerStyle: {
        width: 30,
        height: 30,
        backgroundColor:colors.primaryColor,
        borderRadius: 30
    },
    sliderStyle:{

    },
    intValue : true,
    steps : [
      
    ],
    onChangeValue: (v)=>{},
    onSeek: (v) => {}
}
