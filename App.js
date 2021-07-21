import React, {useEffect, useState} from 'react';

// pre-run if you want to bundle full app
// react-native bundle --platform android --dev false --entry-file index.js --bundle-output app/src/main/assets/index.android.bundle --assets-dest app/src/main/res/

// styling bs
import 'react-native-gesture-handler';
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

// importing screens/stacks
import Login from './src/screens/auth/Login';
import AppStack from './src/stacks/AppStack';
import useUser, {
  useUserById,
  getRealmApp,
  updateUser,
} from './src/states/UserState';
import {StyleSheet, View} from 'react-native';
import ThemedText from './src/components/ThemedText';
import {dim} from './src/lib/Dimensions';
import axios from './src/lib/axios';

const HEIGHT = dim.height;

const App: () => Node = () => {
  // dark mode NavigationContainer
  const scheme = useColorScheme();
  const currentUser = getRealmApp().currentUser;
  const [email, setEmail] = useState(undefined);
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false);
  const user = useUser(email);
  const regedUser = useUserById(currentUser, true);
  const [logged, setLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState(undefined);

  useEffect(() => {
    if (logged) {
      async function fetchData() {
        const res = await axios.get(
          '/tinder/users/find/' + getRealmApp().currentUser.id,
        );
        setLoggedUser(res.data);
      }

      fetchData().then(
        () => {
          console.log(
            'Fetched user with id: ' +
              getRealmApp().currentUser.id +
              ' successfully.',
          );
        },
        error => {
          console.log(error + ' from useUserById');
        },
      );
    }
    if (!logged) {
      setLoggedUser(undefined);
    }
  }, [logged]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoad(false), 5000);
    if (regedUser) {
      setLoad(false);
    }
    return () => clearTimeout(timeout);
  }, [regedUser]);

  useEffect(() => {
    if (!regedUser) {
      setLoad(true);
    }
  }, [regedUser]);

  useEffect(() => {
    if (currentUser && currentUser.profile && currentUser.profile.email) {
      setEmail(currentUser.profile.email);
    }
  }, [currentUser]);

  if (user && !user.confirmed) {
    const oldId = user._id;
    user._id = currentUser.id;
    updateUser(oldId, user);
  }

  if (load && !reload) {
    return (
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <ThemedText text={'App loading...'} style={styles.text} />
          </View>
        </NavigationContainer>
      </AppearanceProvider>
    );
  }

  // displays application stack if logged in
  if ((!load && regedUser && !reload) || loggedUser) {
    return (
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppStack
            logout={() => {
              setLoad(true);
              setReload(true);
              setLogged(false);
              getRealmApp()
                .currentUser.logOut()
                .then(() => {});
            }}
          />
        </NavigationContainer>
      </AppearanceProvider>
    );
  }

  // displays login screen if not logged in
  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Login
          login={() => {
            setLoad(false);
            setLogged(true);
          }}
        />
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 0.025 * HEIGHT,
  },
});
