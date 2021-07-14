import {StyleSheet, View} from 'react-native';
import React from 'react';
import useColors from '../states/ThemeState';
import {Icon} from 'react-native-elements';
import {dim} from '../lib/Dimensions';

const HEIGHT = dim.height;

export default function ThemedBlankImage({style, size}) {
  const colors = useColors();
  const imageSize = size ? size : 0.1 * HEIGHT;
  return (
    <View style={[style, styles.container, {backgroundColor: colors.text}]}>
      <Icon
        name={'person'}
        type={'material'}
        size={imageSize}
        color={'#9c9c9c'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
