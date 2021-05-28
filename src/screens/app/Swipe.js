import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import ThemedText from '../../components/ThemedText';
import useUser from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import LinearGradient from 'react-native-linear-gradient';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Swipe() {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
