import {Image, StyleSheet} from 'react-native';
import {dim} from '../lib/Dimensions';
import React from 'react';
import ThemedBlankImage from './ThemedBlankImage';

const HEIGHT = dim.height;

export default function ChatUserPicture({user, style, self}) {
  let image;
  const color = self ? '#ff69b4' : '#44dbd8';
  if (user.imgBase64) {
    image = (
      <Image
        source={{uri: `data:image/png;base64,${user.imgBase64}`}}
        style={[style, styles.image, {borderColor: color}]}
      />
    );
  } else {
    image = (
      <ThemedBlankImage
        size={0.032 * HEIGHT}
        style={[style, styles.image, {borderColor: color}]}
      />
    );
  }
  return image;
}

const styles = StyleSheet.create({
  image: {
    width: 0.05 * HEIGHT,
    height: 0.05 * HEIGHT,
    borderRadius: 0.05 * HEIGHT,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
