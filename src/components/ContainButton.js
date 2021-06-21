import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
        styles.buttonContainer,
        {
          height: size,
          width: size,
          borderRadius: size,
          backgroundColor: background,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: background,
            borderColor: borderColor,
            borderWidth: borderWidth,
            height: size,
            width: size,
            borderRadius: size,
          },
        ]}
        {...rest}>
        {content}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  button: {
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
