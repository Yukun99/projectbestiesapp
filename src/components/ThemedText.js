import React from 'react';
import {Text} from 'react-native';
import useColors from '../states/ThemeState';

export default function ThemedText({text, style}) {
  const colors = useColors();
  return <Text style={[{color: colors.text}, style]}>{text}</Text>;
}
