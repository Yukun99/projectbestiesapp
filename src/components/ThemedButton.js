import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import useColors from '../states/ThemeState';

export default function ThemedButton({label, style, disabled, ...rest}) {
  const colors = useColors();

  if (disabled) {
    return (
      <View
        style={[
          style,
          styles.button,
          styles.disabled,
          {
            borderColor: colors.border,
          },
        ]}>
        <Text style={[styles.buttonText, {color: colors.border}]}>{label}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={[style, styles.button, styles.enabled]} {...rest}>
      <Text style={[styles.buttonText, {color: colors.text}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2.5,
    borderRadius: 5,
  },
  disabled: {
    flex: 1,
  },
  enabled: {
    backgroundColor: '#ff69b4',
    borderColor: '#ff69b4',
    // ios drop shadow
    shadowColor: '#000000',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    // android drop shadow
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
});
