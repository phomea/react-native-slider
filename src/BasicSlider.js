import React from 'react';
import {View, PanResponder, Text, Animated, Easing, ViewPropTypes} from 'react-native';
import {colors} from './style';

import PropTypes from 'prop-types';

class BasicSlider extends React.Component {
  animatedX = new Animated.Value(0);

  state = {
    x: 0,
    originalX: 0,
    maxValuePosition: 0,
    value: 0,
    maxValue: 100,
  };

  
  calculateValue(position) {
    let r = position / this.state.maxValuePosition;
    let value = this.state.maxValue * r;

    if (this.props.intValue) {
      value = Math.round(value);
    }

    return value;
  }

  shouldRecalculateValue() {
    let value = this.state.value;

    

    this.props.onChangeValue(value);
  }
  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderEnd: () => {
        this.shouldRecalculateValue();
      },
      onPanResponderStart: (event, gesture) => {
        this.animatedX.setValue(event.nativeEvent.locationX);
        this.setState({
          //x: event.nativeEvent.locationX,
          originalX: event.nativeEvent.locationX,
          value: this.calculateValue(event.nativeEvent.locationX),
        });
      },
      onPanResponderMove: (event, gesture) => {
        let x = this.state.originalX + gesture.dx;
        x = x > 0 ? x : 0;
        x = x <= this.state.maxValuePosition ? x : this.state.maxValuePosition;

        this.animatedX.setValue(x);
        this.setState({
          //x,
          value: this.calculateValue(x),
        });
      },
    });
  }


  renderSlider(){
    return (
      <View
      style={{
        height: 10,
        backgroundColor: colors.grey2,
        borderRadius: 5,
        marginHorizontal: 15,
      }}></View>
    );
  }
  renderHandler(){
    return (
      <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            // ...this.props.defaultValue,
            transform: [
              {
                translateX: this.animatedX,
              },
            ],
            ...this.props.handlerStyle,
          }}></Animated.View>
    );
  }
  render() {
    return (
      <View
        onLayout={event => {
          var {width} = event.nativeEvent.layout;
          this.setState({
            maxValuePosition: width - 30,
          });
        }}
        {...this.panResponder.panHandlers}
        style={{
          height: 50,
          justifyContent: 'center',
        }}>
        {this.renderSlider()}

         

        {this.renderHandler()}
        
      </View>
    );
  }
}

BasicSlider.propTypes = {
  handlerStyle: ViewPropTypes.style,
  sliderStyle: ViewPropTypes.style,
  intValue: PropTypes.bool,
  onChangeValue: PropTypes.func,
  onSeek: PropTypes.func,
};
BasicSlider.defaultProps = {
  handlerStyle: {
    width: 30,
    height: 30,
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
  },
  sliderStyle: {},
  intValue: true,
  onChangeValue: v => {},
  onSeek: v => {},
};

export default BasicSlider;
