import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import useUser, {updateUser} from '../states/UserState';
import SignUp from '../screens/auth/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

export default function AppStack() {
  const user = useUser();
  if (!user) {
    // what to do while loading user info from mongoDB
    // probably display some sort of loading screen?
    return <SignUp />;
  } else {
    return (
      <View>
        <Text style={styles.title}>You're Logged In!</Text>

        <Text style={styles.text}>Welcome, {user.name}</Text>
        <View style={{marginTop: 30}}>
          <Button title="Sign Out" onPress={() => auth().signOut()} />
          <Button
            title="test"
            onPress={() =>
              updateUser(auth().currentUser.email, 'name', 'Yu Xukun')
            }
          />
        </View>
      </View>
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
});
