import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import useColors from '../states/ThemeState';
import {Button, Icon} from 'react-native-elements';
import {dim} from '../lib/Dimensions';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function IconButton({style, name, type, size, ...rest}) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: colors.background,
          borderColor: colors.text,
          borderWidth: 0.4,
          borderRadius: 0.07 * HEIGHT,
        },
      ]}
      {...rest}>
      <Icon
        name={name}
        type={type}
        size={size}
        color={colors.text}
        underlayColor={colors.border}
      />
    </TouchableOpacity>
  );
}
