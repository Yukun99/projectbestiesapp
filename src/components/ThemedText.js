import React from 'react';
import {Text} from 'react-native';
import useColors from '../states/ThemeState';

export default function ThemedText({text, style, color, truncate, ...rest}) {
  const colors = useColors();
  const textColor = color ? color : colors.text;
  if (truncate) {
    if (text.length > truncate) {
      const message = text.substring(0, truncate) + '...';
      return (
        <Text style={[style, {color: textColor}]} {...rest}>
          {message}
        </Text>
      );
    }
  }
  return (
    <Text style={[style, {color: textColor}]} {...rest}>
      {text}
    </Text>
  );
}
