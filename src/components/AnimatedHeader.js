import React, {useRef} from 'react';
import {Animated} from 'react-native';
// import {getCloser} from '../utils';

const headerHeight = 116 / 2;

const getCloser = (value, checkOne, checkTwo) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const AnimatedHeader = () => {
  const Ref = useRef(null);
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  const translateYNumber = useRef();

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
    {useNativeDriver: true},
  );

  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    const halfHeader = headerHeight;
    const difference = halfHeader + translateYNumber.current;

    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight
      )
    ) {
      if (Ref.current) {
        Ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight, 0) ===
            -headerHeight
              ? offsetY + difference
              : offsetY - (halfHeader - difference),
        });
      }
    }
  };

  return [handleSnap, handleScroll, Ref, translateY];
};

export default AnimatedHeader;
