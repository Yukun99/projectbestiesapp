import {
  Image,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import ThemedText from '../../components/ThemedText';
import useUser, {updateUser, useUsers} from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import ContainButton from '../../components/ContainButton';
import {Icon} from 'react-native-elements';
import {createChat} from '../../states/ChatState';
import auth from '@react-native-firebase/auth';
import useColors from '../../states/ThemeState';
import ThemedBlankImage from '../../components/ThemedBlankImage';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Swipe() {
  const self = useUser(auth().currentUser.email);
  // reversed since the order of display means last card is rendered on top
  const users = useUsers().reverse();
  const colors = useColors();

  // for info button to show user info
  const [info, setInfo] = useState(undefined);

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

  // opacity for yes/no text based on displacement from center
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
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        // what to do when swiped right
        const matches = self.matches;
        matches[matches.length] = users[index].email;
        const swiped = self.swiped;
        swiped[swiped.length] = users[index].email;
        updateUser(self._id, {matches: matches, swiped: swiped});
        if (users[index].matches && users[index].matches.includes(self.email)) {
          createChat(users[index].email);
        }
        Animated.spring(position, {
          toValue: {x: WIDTH + 100, y: gestureState.dy},
          useNativeDriver: true,
        });
        setIndex(index + 1);
        position.setValue({x: 0, y: 0});
      } else if (gestureState.dx < -120) {
        // what to do when swiped left
        const swiped = self.swiped;
        swiped[swiped.length] = users[index].email;
        updateUser(self._id, {swiped: swiped});
        Animated.spring(position, {
          toValue: {x: -WIDTH - 100, y: gestureState.dy},
          useNativeDriver: true,
        });
        setIndex(index + 1);
        position.setValue({x: 0, y: 0});
      } else {
        // what to do if undecided yet
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          friction: 3,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!users || !self) {
    return null;
  }

  users[users.length] = 'end';

  if (!info) {
    return users
      .map((user, i) => {
        const image = user.imgUrl ? (
          <Image source={{uri: user.imgUrl}} style={styles.cardImage} />
        ) : (
          <ThemedBlankImage style={styles.cardImage} />
        );
        if (user === 'end') {
          return (
            <View style={[styles.container, styles.empty]} key={i}>
              <ThemedText
                text={"You've swiped them all!"}
                style={styles.emptyText}
                color={colors.border}
              />
            </View>
          );
        }
        if (i < index) {
          return null;
        } else if (i === index) {
          if (self.swiped && self.swiped.includes(user.email)) {
            setIndex(index + 1);
          }
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
                {image}
                <TouchableOpacity
                  style={[styles.textContainer, styles.infoButton]}
                  onPress={() => {
                    setInfo(user);
                  }}
                />
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
                  <ThemedText
                    text={user.name}
                    style={styles.nameText}
                    color={'white'}
                  />
                  <ThemedText
                    text={'Year ' + user.year}
                    style={styles.yearText}
                    color={'white'}
                  />
                </LinearGradient>
              </View>
            </Animated.View>
          );
        } else {
          if (self.swiped && self.swiped.includes(user.email)) {
            return null;
          }
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
                {image}
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
                  <ThemedText
                    text={user.name}
                    style={styles.nameText}
                    color={'white'}
                  />
                  <ThemedText
                    text={'Year ' + user.year}
                    style={styles.yearText}
                    color={'white'}
                  />
                </LinearGradient>
              </View>
            </Animated.View>
          );
        }
      })
      .reverse();
  } else {
    const image = info.imgUrl ? (
      <Image source={{uri: info.imgUrl}} style={styles.infoImage} />
    ) : (
      <ThemedBlankImage style={styles.infoImage} />
    );
    const projects =
      info.projects.length > 0 ? (
        info.projects.map((project, i) => (
          <ThemedText key={i} text={project} style={styles.infoUser} />
        ))
      ) : (
        <ThemedText
          text={'This user has not chosen any projects to do yet!'}
          style={styles.infoUser}
        />
      );
    return (
      <View style={styles.infoContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ContainButton
            size={0.09 * HEIGHT}
            style={styles.backButton}
            content={
              <Icon
                name={'arrowup'}
                type={'antdesign'}
                size={0.045 * HEIGHT}
                color={'white'}
              />
            }
            backgroundColor={'#FF69B4'}
            borderColor={'#FF69B4'}
            onPress={() => {
              setInfo(undefined);
            }}
          />
          {image}
          <View style={styles.header}>
            <ThemedText text={info.name} style={styles.infoName} />
          </View>
          <ThemedText text={'Age'} style={styles.infoTitle} />
          <ThemedText text={info.age} style={styles.infoUser} />
          <ThemedText text={'Year'} style={styles.infoTitle} />
          <ThemedText text={info.year} style={styles.infoUser} />
          <ThemedText text={'Projects'} style={styles.infoTitle} />
          {projects}
          <ThemedText text={'LinkedIn'} style={styles.infoTitle} />
          <ThemedText
            text={info.linkedInUrl}
            style={styles.infoUser}
            color={'#27c1bf'}
            onPress={() => {
              Linking.openURL(info.linkedInUrl);
              console.log('hi');
            }}
          />
          <ThemedText text={'Workstyle'} style={styles.infoTitle} />
          <ThemedText text={info.testResults} style={styles.infoUser} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    position: 'absolute',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 0.025 * HEIGHT,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 0.2 * HEIGHT,
    width: WIDTH,
    bottom: 0,
    left: 0,
  },
  nameText: {
    width: '100%',
    fontSize: 0.1 * WIDTH,
    paddingLeft: 0.035 * WIDTH,
    color: 'white',
  },
  yearText: {
    width: '100%',
    fontSize: 0.06 * WIDTH,
    paddingBottom: 0.035 * WIDTH,
    paddingLeft: 0.043 * WIDTH,
    color: 'white',
  },
  infoButton: {
    zIndex: 1,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  submitButton: {
    height: 0.05 * HEIGHT,
    width: 0.5 * WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoName: {
    marginTop: 0.015 * HEIGHT,
    marginLeft: 0.05 * WIDTH,
    paddingBottom: 0.02 * HEIGHT,
    fontSize: 0.05 * HEIGHT,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  infoImage: {
    width: WIDTH - 10,
    height: 0.75 * HEIGHT,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoUser: {
    marginLeft: 0.05 * WIDTH,
    marginTop: 0.01 * HEIGHT,
    fontSize: 0.0375 * WIDTH,
    alignSelf: 'flex-start',
    paddingBottom: 0.02 * HEIGHT,
  },
  infoTitle: {
    marginLeft: 0.05 * WIDTH,
    marginTop: 0.01 * HEIGHT,
    fontSize: 0.05 * WIDTH,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  scrollView: {
    width: WIDTH - 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: 'pink',
    marginLeft: 0.25 * WIDTH,
    marginTop: -0.04 * HEIGHT,
    zIndex: 10,
    position: 'absolute',
    right: 0.05 * WIDTH,
    top: 0.75 * HEIGHT,
  },
});
