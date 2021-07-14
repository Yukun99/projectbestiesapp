import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function ContainButton({
  style,
  content,
  size,
  borderColor,
  backgroundColor,
  borderWidth,
  ...rest
}) {
  const width = borderWidth ? borderWidth : borderColor ? 0.8 : 0;
  const background = backgroundColor ? backgroundColor : undefined;

  return (
    <View
      style={[
        style,
        styles.buttonContainer,
        {
          height: size,
          width: size,
          borderRadius: size,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: background,
            borderColor: borderColor,
            borderWidth: width,
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
