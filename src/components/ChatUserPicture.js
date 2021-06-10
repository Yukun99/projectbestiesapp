import {Image, StyleSheet} from 'react-native';
import {dim} from '../lib/Dimensions';
import useColors from '../states/ThemeState';
import React from 'react';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function ChatUserPicture({user}) {
  const colors = useColors();

  return (
    <Image
      source={{uri: user.imgUrl}}
      style={[
        styles.picture,
        {
          borderColor: colors.border,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 0.05 * HEIGHT,
    height: 0.05 * HEIGHT,
    borderRadius: 0.05 * HEIGHT,
  },
});
