import React, {useState} from 'react';

// styling bs
import {StyleSheet} from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

// setting up google auth
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

// importing screens/stacks
import Login from './src/screens/auth/Login';
import AppStack from './src/stacks/AppStack';

GoogleSignin.configure({
  webClientId:
    '150890917126-keu6b6sr9c5ldpdiqu1ldc81eismf8al.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    // In case an error happens, we can see what type it is
    // Generally ends up being a "dEvElOpEr ErRoR"
    console.log(error);
  }
}

const App: () => Node = () => {
  // dark mode NavigationContainer
  const scheme = useColorScheme();

  // initialise state of user authentication to false
  const [authenticated, setAuthenticated] = useState(false);

  // listener for auth state change
  // sets to true if user exists
  // sets to false otherwise
  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  // displays application stack if logged in
  if (authenticated) {
    return (
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppStack />
        </NavigationContainer>
      </AppearanceProvider>
    );
  }

  // displays login screen if not logged in
  return <Login onGoogleButtonPress={onGoogleButtonPress} />;
};

// optional StyleSheet for future app styling
const styles = StyleSheet.create({});

export default App;
