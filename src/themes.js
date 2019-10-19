import {colors} from './style';
const sliderStyle = {
  height: 1,
  backgroundColor: colors.grey2,
  borderRadius: 5,
};
const completeStyle = {
  ...sliderStyle,
  backgroundColor: colors.primaryColor,
  position: 'absolute',
  left: 0,
  width: 0,
  top: 0,
  bottom: 0,
};
const standardTheme = {
  handlerStyle: {
    width: 20,
    height: 20,
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    elevation: 3,
  },
  sliderStyle: sliderStyle,
  completeStyle: {
    ...completeStyle,
    backgroundColor: '#333',
  },
};

const bigTheme = {
  handlerStyle: {
    ...standardTheme.handlerStyle,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  sliderStyle: {
    ...standardTheme.sliderStyle,
    height: 10,
  },
  completeStyle: {
    ...completeStyle,
    height: 10,
  },
};

const squareTheme = {
  ...standardTheme,
  handlerStyle: {
    ...standardTheme.handlerStyle,
    borderRadius: 2,
  },
  sliderStyle: {
    ...standardTheme.sliderStyle,
    height: 3,
  },
  completeStyle: {
    ...completeStyle,
    height: 3,
    backgroundColor: '#777',
  },
};

const stickTheme = {
  ...standardTheme,
  handlerStyle: {
    ...standardTheme.handlerStyle,
    borderRadius: 2,
    width: 10,
  },
  sliderStyle: {
    ...standardTheme.sliderStyle,
    height: 3,
  },
  completeStyle: {
    ...completeStyle,
    height: 3,
    backgroundColor: '#777',
  },
};

export default {
  standard: standardTheme,
  big: bigTheme,
  square: squareTheme,
  stick: stickTheme,
};
