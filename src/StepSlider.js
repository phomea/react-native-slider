import React from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import {colors} from './style';
import BasicSlider from './BasicSlider';
import PropTypes from 'prop-types';

const sliderContainerStyle = {
  justifyContent: 'center',
};

const stepLabelStyle = {
  position: 'absolute',
  //top: 80,
  top: -20,
  left: -20,
  width: 50,
  textAlign: 'center',
  fontSize: 12,
  lineHeight: 14,
  fontWeight: 'bold',
  color: colors.grey1,
};
const stepStyle = {
  position: 'absolute',
  height: 10,
  width: 4,
  marginLeft: 8,
  backgroundColor: '#ccc',
};

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

      if (currentValue !== value) {
        Animated.timing(this.animatedX, {
          toValue: animateTo,
          duration: 150,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }).start(() => {
          this.setState({
            x: animateTo,
          });
        });
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
      <View style={sliderContainerStyle}>
        {super.renderSlider()}
        {this.props.steps.map(s => {
          return (
            <View
              key={s.value}
              pointerEvents="none"
              style={{
                ...stepStyle,
                left:
                  this.state.maxValuePosition * (s.value / this.state.maxValue),
              }}>
              <Text style={stepLabelStyle}>{s.label}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

StepSlider.propTypes = {
  ...BasicSlider.propTypes,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string,
    }),
  ),
};
StepSlider.defaultProps = {
  ...BasicSlider.defaultProps,
  steps: [],
};

export default StepSlider;
