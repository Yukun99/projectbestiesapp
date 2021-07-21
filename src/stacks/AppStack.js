import React from 'react';
import {Image, LogBox, StyleSheet} from 'react-native';
import SignUp from '../screens/auth/SignUp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../screens/app/Profile/Profile';
import Swipe from '../screens/app/Swipe';
import ChatList from '../screens/app/ChatList';
import {getRealmApp, useUserById} from '../states/UserState';

// ignores stupid warning from rEaNiMaTeD 2
LogBox.ignoreLogs(['Reanimated 2']);

const Tab = createMaterialTopTabNavigator();

function Icon(route) {
  if (route.name === 'Swipe') {
    return (
      <Image style={styles.icon} source={require('../../assets/icon.png')} />
    );
  } else if (route.name === 'Profile') {
    return (
      <Image
        style={[styles.icon, styles.materialicon]}
        source={require('../../assets/profile.png')}
      />
    );
  } else if (route.name === 'Chat') {
    return (
      <Image
        style={[styles.icon, styles.materialicon]}
        source={require('../../assets/chat.png')}
      />
    );
  }
}

export default function AppStack({logout}) {
  const user = useUserById(getRealmApp().currentUser, true);
  if (user === null) {
    return null;
  }
  if (!user) {
    if (user && user.name === 'null') {
      // before sign up
      return (
        <SignUp
          user={user}
          update={() => {
            user.name = 'notnull';
          }}
        />
      );
    }
  }
  if (!user) {
    return null;
  }
  return (
    <Tab.Navigator
      initialRouteName={'Swipe'}
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          return Icon(route);
        },
      })}
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
      }}>
      <Tab.Screen name="Profile" children={() => <Profile logout={logout} />} />
      <Tab.Screen name="Swipe" component={Swipe} />
      <Tab.Screen name="Chat" component={ChatList} />
    </Tab.Navigator>
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
  materialicon: {
    tintColor: '#8e8e8e',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
