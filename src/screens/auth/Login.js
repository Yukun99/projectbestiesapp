import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import useColors from '../../states/ThemeState';
import {useColorScheme} from 'react-native-appearance';

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
    fontSize: 25,
    marginBottom: 30,
  },
  icon: {
    height: '10%',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderWidth: 2,
  },
});
