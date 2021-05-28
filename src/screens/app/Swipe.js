import {
  Image,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import ThemedText from '../../components/ThemedText';
import useUser, {useUsers} from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import LinearGradient from 'react-native-linear-gradient';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Swipe() {
  // const user = useUser();
  const users = useUsers().reverse();

  // initialise position of card
  const position = new Animated.ValueXY();

  // index tracker to only rotate top card
  const [index, setIndex] = useState(0);

  // rotate value for swiping
  const rotate = position.x.interpolate({
    inputRange: [-WIDTH / 2, 0, WIDTH / 2],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  // overall transformation for top card
  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  // opacity for yes/no text
  const yesOpacity = position.x.interpolate({
    inputRange: [-WIDTH / 2, 0, WIDTH / 2],
    outputRange: [0, 0, 2],
    extrapolate: 'clamp',
  });
  const noOpacity = position.x.interpolate({
    inputRange: [-WIDTH / 2, 0, WIDTH / 2],
    outputRange: [2, 0, 0],
    extrapolate: 'clamp',
  });

  // transformation options for next card in stack
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-WIDTH / 3, 0, WIDTH / 3],
    outputRange: [0.9, 0, 0.9],
    extrapolate: 'clamp',
  });
  const nextCardScale = position.x.interpolate({
    inputRange: [-WIDTH / 3, 0, WIDTH / 3],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  // initialise PanResponder for swiping
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: {x: WIDTH + 100, y: gestureState.dy},
          useNativeDriver: true,
        });
        setIndex(index + 1);
        position.setValue({x: 0, y: 0});
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: {x: -WIDTH - 100, y: gestureState.dy},
          useNativeDriver: true,
        });
        setIndex(index + 1);
        position.setValue({x: 0, y: 0});
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          friction: 3,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!users) {
    return null;
  }

  return users
    .map((user, i) => {
      if (i < index) {
        return null;
      } else if (i === index) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={i}
            style={[styles.container, rotateAndTranslate]}>
            <Animated.View
              style={[
                styles.yesContainer,
                {
                  opacity: yesOpacity,
                },
              ]}>
              <Text style={[styles.yesText]}>YES!</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.noContainer,
                {
                  opacity: noOpacity,
                },
              ]}>
              <Text style={[styles.noText]}>NO!</Text>
            </Animated.View>
            <View style={styles.swipeCard}>
              <Image source={{uri: user.imgUrl}} style={styles.cardImage} />
              <LinearGradient
                colors={[
                  'rgba(0,0,0,1)',
                  'rgba(0,0,0,0.95)',
                  'rgba(0,0,0,0.9)',
                  'rgba(0,0,0,0)',
                ]}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={styles.textContainer}>
                <ThemedText text={user.name} style={styles.nameText} />
                <ThemedText text={'Age: ' + user.age} style={styles.ageText} />
              </LinearGradient>
            </View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={i}
            style={[
              styles.container,
              {
                opacity: nextCardOpacity,
                transform: [{scale: nextCardScale}],
              },
            ]}>
            <View style={styles.swipeCard}>
              <Image source={{uri: user.imgUrl}} style={styles.cardImage} />
              <LinearGradient
                colors={[
                  'rgba(0,0,0,1)',
                  'rgba(0,0,0,0.95)',
                  'rgba(0,0,0,0.9)',
                  'rgba(0,0,0,0)',
                ]}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={styles.textContainer}>
                <ThemedText text={user.name} style={styles.nameText} />
                <ThemedText text={'Age: ' + user.age} style={styles.ageText} />
              </LinearGradient>
            </View>
          </Animated.View>
        );
      }
    })
    .reverse();
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    position: 'absolute',
  },
  swipeCard: {
    margin: 5,
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },
  yesContainer: {
    position: 'absolute',
    top: 0.08 * HEIGHT,
    left: 0.12 * WIDTH,
    height: 0.06 * HEIGHT,
    width: 0.23 * WIDTH,
    zIndex: 1,
    transform: [{rotate: '-20deg'}],
  },
  yesText: {
    borderWidth: 1,
    borderColor: '#0dc10d',
    borderRadius: 0.01 * HEIGHT,
    color: '#0dc10d',
    fontSize: 0.04 * HEIGHT,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  noContainer: {
    position: 'absolute',
    top: 0.08 * HEIGHT,
    right: 0.12 * WIDTH,
    height: 0.06 * HEIGHT,
    width: 0.23 * WIDTH,
    zIndex: 1,
    transform: [{rotate: '20deg'}],
  },
  noText: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 0.01 * HEIGHT,
    color: 'red',
    fontSize: 0.04 * HEIGHT,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '20%',
    width: '100%',
  },
  nameText: {
    width: '100%',
    fontSize: WIDTH / 10,
    paddingLeft: 15,
    color: 'white',
  },
  ageText: {
    width: '100%',
    fontSize: WIDTH / 17,
    paddingBottom: 15,
    paddingLeft: 15,
    color: 'white',
  },
});
