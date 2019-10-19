import React from 'react';
import {View, PanResponder, Animated, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import themes from './themes';

class BasicSlider extends React.Component {
  animatedX = new Animated.Value(0);

  handlerStyle = themes.standard.handlerStyle;
  sliderStyle = themes.standard.sliderStyle;
  completeStyle = themes.standard.completeStyle;

  state = {
    x: 0,
    originalX: 0,
    maxValuePosition: 0,
    value: 0,
    maxValue: 100,
  };

  updateTheme(themeName) {
    this.handlerStyle = {
      ...themes[themeName].handlerStyle,
      ...this.props.handlerStyle,
    };
    this.sliderStyle = {
      ...themes[themeName].sliderStyle,
      ...this.props.sliderStyle,
    };
    this.completeStyle = {
      ...themes[themeName].completeStyle,
      ...this.props.completeStyle,
    };
    this.forceUpdate();
  }

  componentDidMount() {
    if (this.props.theme) {
      this.updateTheme(this.props.theme);
    }
  }

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
          x: event.nativeEvent.locationX,
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
          x,
          value: this.calculateValue(x),
        });
      },
    });
  }

  renderSlider() {
    const sliderStyle = {
      ...this.sliderStyle,
      marginHorizontal: this.handlerStyle.width / 2,
    };
    const completeStyle = {
      ...this.completeStyle,
      width: this.state.x,
    };

    return (
      <View>
        <View style={sliderStyle} />
        <View style={completeStyle} />
      </View>
    );
  }
  renderHandler() {
    const handlerStyle = {
      position: 'absolute',
      transform: [
        {
          translateX: this.animatedX,
        },
      ],
      ...this.handlerStyle,
    };
    return <Animated.View pointerEvents="none" style={handlerStyle} />;
  }
  render() {
    const containerStyle = {
      height: 50,
      justifyContent: 'center',
    };
    return (
      <View
        onLayout={event => {
          var {width} = event.nativeEvent.layout;
          this.setState({
            maxValuePosition: width - this.handlerStyle.width,
          });
        }}
        {...this.panResponder.panHandlers}
        style={containerStyle}>
        {this.renderSlider()}

        {this.renderHandler()}
      </View>
    );
  }
}

BasicSlider.propTypes = {
  handlerStyle: ViewPropTypes.style,
  sliderStyle: ViewPropTypes.style,
  completeStyle: ViewPropTypes.style,
  intValue: PropTypes.bool,
  onChangeValue: PropTypes.func,
  onSeek: PropTypes.func,
};
BasicSlider.defaultProps = {
  theme: 'standard',
  intValue: true,
  onChangeValue: v => {},
  onSeek: v => {},
};

export default BasicSlider;
