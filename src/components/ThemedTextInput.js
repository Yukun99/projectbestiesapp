import React from 'react';
import {TextInput} from 'react-native';
import useColors from '../states/ThemeState';

export default function ThemedTextInput({label, value, style, ...rest}) {
  const colors = useColors();
  return (
    <TextInput
      value={value}
      style={[
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 2.5,
          borderRadius: 5,
          color: colors.text,
        },
        style,
      ]}
      numberOfLines={1}
      placeholder={label}
      placeholderTextColor={colors.border}
      {...rest}
    />
  );
}
