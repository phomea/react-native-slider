import React from 'react';
import {
  View,
  PanResponder,
  Text,
  Animated,
  Easing,
  ViewPropTypes,
} from 'react-native';
import {colors} from './style';
import BasicSlider from './BasicSlider';
import PropTypes from 'prop-types';

class StepSlider extends BasicSlider {
  shouldRecalculateValue() {
    let value = this.state.value;

    if (this.props.steps.length > 0) {
      let min = 999999999;
      let currentValue = value;
      let animateTo = 0;

      let steps = [
        {
          value: 0,
          position: 0,
        },
        ...this.props.steps,
        {
          value: this.state.maxValue,
          position: 1,
        },
      ];

      steps.forEach(s => {
        let m = value > s.value ? value - s.value : s.value - value;
        if (m < min) {
          min = m;
          currentValue = s.value;
          animateTo =
            this.state.maxValuePosition * (s.value / this.state.maxValue);
        }
      });

      if (currentValue != value) {
        Animated.timing(this.animatedX, {
          toValue: animateTo,
          duration: 150,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }).start();
        value = currentValue;
        this.setState({
          value: currentValue,
        });
      }
    }

    this.props.onChangeValue(value);
  }

  setState(newState) {
    if (newState.value !== this.state.value && this.props.steps.length === 0) {
      this.props.onSeek(newState.value);
    }
    super.setState(newState);
  }

  renderSlider() {
    return (
      <View style={{
          justifyContent:"center"
      }}>
        {super.renderSlider()}
        {this.props.steps.map(s => {
          return (
            <View
              key={s.value}
              pointerEvents="none"
              style={{
                position: 'absolute',
                left:
                  this.state.maxValuePosition * (s.value / this.state.maxValue),
                height: 40,
                width: 4,
                marginLeft: 13,
                backgroundColor: '#ccc',
              }}>
              <Text
                style={{
                  position: 'absolute',
                  top: 80,
                  left: 0,
                  height: 30,
                  width: 50,
                  marginLeft: -23,
                  textAlign: 'center',
                  fontSize: 10,
                  lineHeight: 10,
                  fontWeight: 'bold',
                  textAlignVertical: 'bottom',
                  color: colors.grey1,

                  transform: [
                    {
                      translateY: -30,
                    },
                  ],
                }}>
                {s.label}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}
/*
StepSlider.propTypes = {
  ...BasicSlider.propTypes,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string,
    }),
  ),
};*/
StepSlider.defaultProps = {
  //...BasicSlider.propTypes,
  handlerStyle: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 30,
  },
  sliderStyle: {},
  intValue: true,
  onChangeValue: v => {},
  onSeek: v => {},
  steps: [],
};

export default StepSlider;
