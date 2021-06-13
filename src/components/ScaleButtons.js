import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import RadioGroup from 'react-native-radio-button-group';
import {dim} from '../lib/Dimensions';
import useColors from '../states/ThemeState';
import ThemedText from './ThemedText';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function ScaleButtons({answer, setAnswer, ...rest}) {
  const colors = useColors();
  return (
    <View style={{backgroundColor: colors.background}}>
      <RadioButton.Group
        onValueChange={newValue => setAnswer(newValue)}
        value={answer}
        color={'#ff69b4'}>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.text} text={'Not at all like me'} />
          <RadioButton
            value={1}
            status={answer === 1 ? 'checked' : 'unchecked'}
            color={'#ff69b4'}
            uncheckedColor={'#999999'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.text} text={'A little bit like me'} />
          <RadioButton
            value={2}
            status={answer === 2 ? 'checked' : 'unchecked'}
            onPress={() => setAnswer(2)}
            color={'#ff69b4'}
            uncheckedColor={'#999999'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.text} text={'Somewhat like me'} />
          <RadioButton
            value={3}
            status={answer === 3 ? 'checked' : 'unchecked'}
            onPress={() => setAnswer(3)}
            color={'#ff69b4'}
            uncheckedColor={'#999999'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.text} text={'A lot like me'} />
          <RadioButton
            value={4}
            status={answer === 4 ? 'checked' : 'unchecked'}
            onPress={() => setAnswer(4)}
            color={'#ff69b4'}
            uncheckedColor={'#999999'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.text} text={'Exactly like me'} />
          <RadioButton
            value={5}
            status={answer === 5 ? 'checked' : 'unchecked'}
            onPress={() => setAnswer(5)}
            color={'#ff69b4'}
            uncheckedColor={'#999999'}
          />
        </View>
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
  },
  text: {
    left: 0.1 * WIDTH,
    position: 'absolute',
    fontSize: 0.04 * WIDTH,
  },
});
