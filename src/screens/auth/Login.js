import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import useColors from '../../states/ThemeState';
import {useColorScheme} from 'react-native-appearance';
import {dim} from '../../lib/Dimensions';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Login(props) {
  const colors = useColors();
  const scheme = useColorScheme();

  return (
    <View style={[{backgroundColor: colors.background}, styles.screen]}>
      <Text style={[{color: colors.text}, styles.title]}>
        Welcome to Project Besties!
      </Text>
      <Image style={styles.icon} source={require('../../../assets/icon.png')} />
      <Text style={[{color: colors.text}, styles.subtitle]}>
        Log In With Google
      </Text>

      {/*google sign in button prop, looks pretty legit*/}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        onPress={props.onGoogleButtonPress}
        color={
          scheme === 'dark'
            ? GoogleSigninButton.Color.Dark
            : GoogleSigninButton.Color.Light
        }
        style={[{borderColor: colors.border}, styles.button]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 0.07 * WIDTH,
    marginBottom: 0.03 * HEIGHT,
  },
  icon: {
    height: '10%',
    resizeMode: 'contain',
    marginBottom: 0.03 * HEIGHT,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 0.03 * HEIGHT,
    marginBottom: 0.02 * HEIGHT,
  },
  button: {
    borderWidth: 2,
  },
});
