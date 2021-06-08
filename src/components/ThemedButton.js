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
          {
            flex: 1,
            borderColor: colors.border,
            borderWidth: 2.5,
            borderRadius: 5,
          },
        ]}>
        <Text style={[styles.buttonText, {color: colors.border}]}>{label}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: '#ff69b4',
          shadowColor: '#000000',
          shadowOffset: {height: 1, width: 1},
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 5,
          borderColor: '#ff69b4',
          borderWidth: 2.5,
          borderRadius: 5,
        },
      ]}
      {...rest}>
      <Text style={[styles.buttonText, {color: colors.text}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
});
