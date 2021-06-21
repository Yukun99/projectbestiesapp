import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import useColors from '../states/ThemeState';

export default function ThemedTextInput({label, value, style, ...rest}) {
  const colors = useColors();
  return (
    <TextInput
      value={value}
      style={[
        style,
        styles.textInput,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          color: colors.text,
        },
      ]}
      numberOfLines={1}
      placeholder={label}
      placeholderTextColor={colors.border}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2.5,
    borderRadius: 5,
  },
});
