import {Image, StyleSheet} from 'react-native';
import {dim} from '../lib/Dimensions';
import React from 'react';

const HEIGHT = dim.height;

export default function ChatUserPicture({user, style, self}) {
  const color = self ? '#ff69b4' : '#44dbd8';
  return (
    <Image
      source={{uri: user.imgUrl}}
      style={[style, styles.picture, {borderColor: color}]}
    />
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 0.05 * HEIGHT,
    height: 0.05 * HEIGHT,
    borderRadius: 0.05 * HEIGHT,
    borderWidth: 1.5,
  },
});
