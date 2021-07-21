import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function ContainButton({
  style,
  content,
  size,
  borderColor,
  backgroundColor,
  borderWidth,
  round,
  ...rest
}) {
  const width = borderWidth ? borderWidth : borderColor ? 0.8 : 0;
  const background = backgroundColor ? backgroundColor : undefined;
  const borderRadius = round === undefined || round === true ? size : 5;

  return (
    <View
      style={[
        style,
        styles.buttonContainer,
        {
          height: size,
          width: size,
          borderRadius: borderRadius,
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
            borderRadius: borderRadius,
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
