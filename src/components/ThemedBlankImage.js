import {View} from 'react-native';
import React from 'react';
import useColors from '../states/ThemeState';
import {Icon} from 'react-native-elements';
import {dim} from '../lib/Dimensions';

const HEIGHT = dim.height;

export default function ThemedBlankImage({style}) {
  const colors = useColors();
  return (
    <View style={[style, {backgroundColor: colors.text}]}>
      <Icon
        name={'no-photography'}
        type={'material'}
        size={0.04 * HEIGHT}
        color={colors.border}
      />
    </View>
  );
}
