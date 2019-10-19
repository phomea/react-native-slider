import React from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import {colors} from './style';
import BasicSlider from './BasicSlider';
import PropTypes from 'prop-types';
import themes from './themes';

class FluidSlider extends BasicSlider {
  handlerY = new Animated.Value(0);
  moving = false;

  panResponderMove(event, gesture) {
    if (!this.moving) {
      this.moving = true;
      Animated.timing(this.handlerY, {
        toValue: -40,
        duration: 200,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }).start();
    }
    super.panResponderMove(event, gesture);
  }
  panResponderStart(event, gesture) {
    super.panResponderStart(event, gesture);
  }
  panResponderEnd() {
    this.moving = false;
    this.forceUpdate();
    super.panResponderEnd();
    Animated.timing(this.handlerY, {
      toValue: 0,
      duration: 200,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start(() => {
      this.moving = false;
    });
  }

  updateTheme(themeName) {
    this.handlerStyle = {
      ...themes.big.handlerStyle,
      ...this.props.handlerStyle,
      backgroundColor: '#fff',
      elevation: 0,
      borderColor: colors.primaryColor,
      borderWidth: 3,
    };
    this.sliderStyle = {
      ...themes.big.sliderStyle,
      ...this.props.sliderStyle,
      height: 30,
      borderRadius: 30,
    };
    this.completeStyle = {
      ...themes.big.completeStyle,
      ...this.props.completeStyle,
      height: 30,
      borderRadius: 30,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
    this.forceUpdate();
  }

  renderHandler() {
    const handlerStyle = {
      position: 'absolute',
      transform: [
        {
          translateX: this.animatedX,
        },
        {
          translateY: this.handlerY,
        },
        {
          scale: this.moving ? 1.3 : 1,
        },
      ],
      ...this.handlerStyle,
    };
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          ...handlerStyle,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {this.moving ? this.state.value : ''}
        </Text>
      </Animated.View>
    );
  }
}

FluidSlider.propTypes = {
  ...BasicSlider.propTypes,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string,
    }),
  ),
};
FluidSlider.defaultProps = {
  ...BasicSlider.defaultProps,
  steps: [],
};

export default FluidSlider;
