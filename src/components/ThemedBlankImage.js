import {View} from 'react-native';
import React from 'react';
import useColors from '../states/ThemeState';
import {Icon} from 'react-native-elements';

export default function ThemedBlankImage({style}) {
  const colors = useColors();
  return (
    <View style={[style, {backgroundColor: colors.text}]}>
      <Icon
        name={'no-photography'}
        type={'material'}
        size={30}
        color={colors.border}
      />
    </View>
  );
}
