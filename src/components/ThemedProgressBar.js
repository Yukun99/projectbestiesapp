import {ProgressBar} from 'react-native-paper';
import React from 'react';
import useColors from '../states/ThemeState';

export default function ThemedProgressBar({...rest}) {
  const colors = useColors();
  return <ProgressBar style={{backgroundColor: colors.border}} {...rest} />;
}
