import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import useColors from '../states/ThemeState';

export default function ContainButton({style, content, size, ...rest}) {
  const colors = useColors();

  return (
    <View
      style={[
        style,
        {
          height: size,
          width: size,
          backgroundColor: colors.text,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: size,
          overflow: 'visible',
        },
      ]}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.background,
          borderColor: colors.text,
          borderWidth: 0.8,
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
