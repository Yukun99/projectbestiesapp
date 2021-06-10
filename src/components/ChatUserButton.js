import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import useColors from '../states/ThemeState';
import {dim} from '../lib/Dimensions';
import ThemedText from './ThemedText';

const WIDTH = dim.width;
const HEIGHT = dim.height;

export default function ChatUserButton({user, press, ...rest}) {
  const colors = useColors();

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          height: 0.15 * HEIGHT,
          width: WIDTH,
        }}
        onPress={press}
        {...rest}>
        <Image
          source={{
            uri: user.imgUrl,
          }}
          style={{
            height: 0.12 * HEIGHT,
            width: 0.12 * HEIGHT,
            marginTop: 0.015 * HEIGHT,
            marginLeft: 0.015 * HEIGHT,
            borderRadius: 0.12 * HEIGHT,
          }}
        />
        <ThemedText
          style={{
            color: colors.text,
            position: 'absolute',
            left: 0.175 * HEIGHT,
            top: 0.025 * HEIGHT,
            fontSize: 0.025 * HEIGHT,
            fontWeight: 'bold',
          }}
          text={user.name}
        />
        <ThemedText
          style={{
            color: colors.text,
            position: 'absolute',
            left: 0.175 * HEIGHT,
            top: 0.065 * HEIGHT,
            fontSize: 0.0175 * HEIGHT,
            width: 0.35 * HEIGHT,
          }}
          text={'This is a dummy message. A A A A A A A A A A A A H E L P'}
        />
      </TouchableOpacity>
    </View>
  );
}
