import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useColors from '../states/ThemeState';

export default function ContainButton({
  style,
  content,
  size,
  borderColor,
  backgroundColor,
  ...rest
}) {
  const colors = useColors();
  const borderWidth = borderColor ? 0.8 : 0;
  const background = backgroundColor ? backgroundColor : colors.background;

  return (
    <View
      style={[
        style,
        {
          height: size,
          width: size,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: size,
          overflow: 'visible',
          backgroundColor: background,
        },
      ]}>
      <TouchableOpacity
        style={{
          backgroundColor: background,
          borderColor: borderColor,
          borderWidth: borderWidth,
          height: size,
          width: size,
          borderRadius: size,
          borderStyle: 'solid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...rest}>
        {content}
      </TouchableOpacity>
    </View>
  );
}
