import React, {useState} from 'react';
import {Image, LogBox, StyleSheet} from 'react-native';
import useUser from '../states/UserState';
import SignUp from '../screens/auth/SignUp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../screens/app/Profile';
import Swipe from '../screens/app/Swipe';
import Chat from '../screens/app/Chat';
import PersonalityTest from '../screens/auth/PersonalityTest';

LogBox.ignoreLogs(['Reanimated 2']);

const Tab = createMaterialTopTabNavigator();

function Icon(route, focused) {
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

export default function AppStack() {
  const user = useUser();
  const [registered, setRegistered] = useState(false);
  if (!registered) {
    // before login
    return (
      <SignUp
        user={user}
        update={() => {
          setRegistered(true);
        }}
      />
    );
  } else {
    if (!user) {
      return null;
    }
    return (
      <Tab.Navigator
        initialRouteName={'Swipe'}
        screenOptions={({route, focused}) => ({
          tabBarIcon: () => {
            return Icon(route, focused);
          },
        })}
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
        }}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Swipe" component={Swipe} />
        <Tab.Screen name="Chat" children={() => <Chat self={user} />} />
      </Tab.Navigator>
    );
  }
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
