import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import useColors from '../../states/ThemeState';
import {dim} from '../../lib/Dimensions';
import ThemedText from '../../components/ThemedText';
import ThemedTextInput from '../../components/ThemedTextInput';
import ThemedButton from '../../components/ThemedButton';
import Realm from 'realm';
import ContainButton from '../../components/ContainButton';
import {createUser, getRealmApp} from '../../states/UserState';

const HEIGHT = dim.height;
const WIDTH = dim.width;

function isNUSEmail(email) {
  if (email.length < 18) {
    return false;
  }
  if (email.charAt(0).toLowerCase() !== 'e') {
    console.log(email.charAt(0).toLowerCase());
    return false;
  }
  if (Number.isNaN(Number.parseInt(email.substring(1, 8), 10))) {
    console.log(email.substring(1, 8));
    return false;
  }
  if (email.substring(8, 18) !== '@u.nus.edu') {
    console.log(email.substring(8, 18));
    return false;
  }
  return true;
}

export default function Login({login}) {
  const colors = useColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  // invalid email/password warning toggle
  const [userInvalid, setUserInvalid] = useState(false);
  // password reset email sent toggle
  const [userReset, setUserReset] = useState(false);
  // no such user found warning toggle
  const [noUser, setNoUser] = useState(false);
  // password too short warning toggle
  const [passwordShort, setPasswordShort] = useState(false);
  const [status, setStatus] = useState(
    <View style={[styles.blankContainer, {backgroundColor: colors.background}]}>
      <ThemedText
        text={'Blank'}
        style={styles.blankText}
        color={colors.background}
      />
    </View>,
  );
  const app = getRealmApp();

  const forgotButton = (
    <ContainButton
      content={
        <ThemedText
          text={'Forgot Password? Enter email and click here.'}
          style={styles.inputSubText}
        />
      }
      onPress={async () => {
        setUserInvalid(false);
        await app.emailPasswordAuth
          .sendResetPasswordEmail(email)
          .then(() => {
            setNoUser(false);
            setPasswordShort(false);
            setUserReset(true);
          })
          .catch(err => {
            switch (err.code) {
              case 45:
                setNoUser(true);
                return;
              default:
                console.log(err);
            }
          });
      }}
    />
  );

  useEffect(() => {
    if (userInvalid) {
      setStatus(
        <View style={styles.invalidContainer}>
          <ThemedText
            text={'Invalid Email/Password'}
            style={styles.invalidText}
            color={'red'}
          />
        </View>,
      );
    }
    if (userReset) {
      setStatus(
        <View style={styles.resetContainer}>
          <ThemedText
            text={'Email Sent'}
            style={styles.resetText}
            color={'#0dc10d'}
          />
        </View>,
      );
    }
    if (noUser) {
      setStatus(
        <View style={styles.invalidContainer}>
          <ThemedText
            text={'Invalid Email'}
            style={styles.invalidText}
            color={'red'}
          />
        </View>,
      );
    }
    if (passwordShort) {
      setStatus(
        <View style={styles.invalidContainer}>
          <ThemedText
            text={'Password Less Than 6 Characters Long'}
            style={styles.invalidText}
            color={'red'}
          />
        </View>,
      );
    }
  }, [noUser, passwordShort, userInvalid, userReset]);

  useEffect(() => {
    if (!userInvalid && !userReset && !noUser && !passwordShort) {
      setStatus(
        <View
          style={[styles.blankContainer, {backgroundColor: colors.background}]}>
          <ThemedText
            text={'Blank'}
            style={styles.blankText}
            color={colors.background}
          />
        </View>,
      );
    }
  }, [colors.background, noUser, passwordShort, userInvalid, userReset]);

  if (register) {
    return (
      <View style={[{backgroundColor: colors.background}, styles.screen]}>
        <Image
          style={styles.title}
          source={require('../../../assets/title.png')}
        />
        <Image
          style={styles.icon}
          source={require('../../../assets/icon.png')}
        />
        <View style={styles.inputContainer}>
          <ThemedText text={'NUS Email'} style={styles.inputText} />
          <ThemedTextInput
            label={'NUS Email'}
            onChangeText={data => setEmail(data)}
            value={email}
            autoCorrect={false}
            style={styles.inputBox}
            keyboardType={'email-address'}
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText text={'Password'} style={styles.inputText} />
          <ThemedTextInput
            label={'Password'}
            onChangeText={data => setPassword(data)}
            value={password}
            autoCorrect={false}
            style={styles.inputBox}
            textContentType={'password'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedButton
            label={'Sign Up'}
            style={[styles.authButton, styles.leftButton]}
            onPress={async () => {
              setNoUser(false);
              setUserInvalid(false);
              setUserReset(false);
              if (!isNUSEmail(email)) {
                setPasswordShort(false);
                setNoUser(true);
                return;
              }
              await app.emailPasswordAuth
                .registerUser(email, password)
                .then(() => {
                  createUser(
                    undefined,
                    'null',
                    email,
                    -1,
                    -1,
                    undefined,
                    undefined,
                    undefined,
                    false,
                  );
                })
                .catch(err => {
                  switch (err.code) {
                    case 48:
                      setPasswordShort(true);
                      return;
                    default:
                      console.log(err);
                      return;
                  }
                });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <ContainButton
            content={
              <ThemedText
                text={'Already registered? Sign in here.'}
                style={styles.inputSubText}
              />
            }
            onPress={() => {
              setRegister(false);
              setEmail('');
              setPassword('');
            }}
          />
          {forgotButton}
        </View>
        {status}
      </View>
    );
  }

  return (
    <View style={[{backgroundColor: colors.background}, styles.screen]}>
      <Image
        style={styles.title}
        source={require('../../../assets/title.png')}
      />
      <Image style={styles.icon} source={require('../../../assets/icon.png')} />

      <View style={styles.inputContainer}>
        <ThemedText text={'NUS Email'} style={styles.inputText} />
        <ThemedTextInput
          label={'NUS Email'}
          onChangeText={data => setEmail(data)}
          value={email}
          autoCorrect={false}
          style={styles.inputBox}
          keyboardType={'email-address'}
        />
      </View>
      <View style={styles.inputContainer}>
        <ThemedText text={'Password'} style={styles.inputText} />
        <ThemedTextInput
          label={'Password'}
          onChangeText={data => setPassword(data)}
          value={password}
          autoCorrect={false}
          style={styles.inputBox}
          textContentType={'password'}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <ThemedButton
          label={'Login'}
          style={[styles.authButton, styles.leftButton]}
          onPress={async () => {
            if (!isNUSEmail(email)) {
              setUserInvalid(false);
              setUserReset(false);
              setPasswordShort(false);
              setNoUser(true);
              return;
            }
            const credentials = Realm.Credentials.emailPassword(
              email,
              password,
            );
            await app
              .logIn(credentials)
              .then(() => {
                setUserReset(false);
                setPasswordShort(false);
                setUserInvalid(false);
                setNoUser(false);
                console.log('Logged in.');
              })
              .catch(err => {
                switch (err.code) {
                  case 47:
                    setUserReset(false);
                    setPasswordShort(false);
                    setUserInvalid(false);
                    setNoUser(true);
                    console.log('invalid username');
                    return;
                  case -1:
                    setNoUser(false);
                    setUserReset(false);
                    setPasswordShort(false);
                    setUserInvalid(true);
                    console.log('invalid username/password');
                    return;
                  default:
                    console.log(err);
                }
              });
            login();
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <ContainButton
          content={
            <ThemedText
              text={'New user? Sign up here.'}
              style={styles.inputSubText}
            />
          }
          onPress={() => {
            setRegister(true);
            setEmail('');
            setPassword('');
          }}
        />
        {forgotButton}
      </View>
      {status}
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
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 0.03 * HEIGHT,
    position: 'absolute',
    top: -0.11 * HEIGHT,
  },
  icon: {
    height: '15%',
    resizeMode: 'contain',
    marginBottom: 0.03 * HEIGHT,
  },
  inputContainer: {
    paddingVertical: 10,
    width: '85%',
  },
  inputText: {
    fontSize: 0.05 * WIDTH,
    paddingBottom: 7,
    paddingLeft: 5,
  },
  inputSubText: {
    fontSize: 0.04 * WIDTH,
    paddingLeft: 5,
    paddingBottom: 7,
    color: '#999999',
  },
  invalidContainer: {
    paddingVertical: 0.025 * HEIGHT,
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: 'rgb(255, 0, 0)',
  },
  invalidText: {
    fontSize: 0.04 * WIDTH,
    paddingBottom: 7,
    paddingLeft: 5,
    position: 'absolute',
    bottom: 0,
  },
  resetContainer: {
    paddingVertical: 0.025 * HEIGHT,
    backgroundColor: 'rgba(13, 193, 13, 0.15)',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: 'rgb(13, 193, 13)',
  },
  resetText: {
    fontSize: 0.04 * WIDTH,
    paddingBottom: 7,
    paddingLeft: 5,
    position: 'absolute',
    bottom: 0,
  },
  blankContainer: {
    paddingVertical: 0.025 * HEIGHT,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
  },
  blankText: {
    fontSize: 0.04 * WIDTH,
    paddingBottom: 7,
    paddingLeft: 5,
    position: 'absolute',
    bottom: 0,
  },
  inputBox: {
    margin: 0,
    paddingLeft: 10,
    width: '100%',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 0.03 * HEIGHT,
    marginBottom: 0.02 * HEIGHT,
  },
  button: {
    borderWidth: 2,
  },
  authButton: {
    height: 0.05 * HEIGHT,
    width: 0.3 * WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
