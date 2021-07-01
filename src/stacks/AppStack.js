import React, {useState} from 'react';
import {Image, LogBox, StyleSheet} from 'react-native';
import useUser from '../states/UserState';
import SignUp from '../screens/auth/SignUp';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../screens/app/Profile/Profile';
import Swipe from '../screens/app/Swipe';
import ChatList from '../screens/app/ChatList';
import auth from '@react-native-firebase/auth';

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

export default function AppStack() {
  const user = useUser(auth().currentUser.email);
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
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            return Icon(route);
          },
        })}
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
        }}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Swipe" component={Swipe} />
        <Tab.Screen name="Chat" component={ChatList} />
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
