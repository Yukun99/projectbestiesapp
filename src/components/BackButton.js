import {Icon} from 'react-native-elements';
import ContainButton from './ContainButton';
import React from 'react';
import {dim} from '../lib/Dimensions';
import {StyleSheet} from 'react-native';

const HEIGHT = dim.height;

export default function BackButton({...rest}) {
  return (
    <ContainButton
      size={0.07 * HEIGHT}
      style={styles.backButton}
      content={
        <Icon
          name={'arrow-back'}
          type={'material'}
          size={0.045 * HEIGHT}
          color={'#FF69B4'}
        />
      }
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  backButton: {
    zIndex: 1,
    left: 0.02 * HEIGHT,
    top: 0.02 * HEIGHT,
    position: 'absolute',
  },
});
