import React from 'react';
import {Text} from 'react-native';
import useColors from '../states/ThemeState';

export default function ThemedText({text, style, color}) {
  const colors = useColors();
  const textColor = color ? color : colors.text;
  return <Text style={[style, {color: textColor}]}>{text}</Text>;
}
