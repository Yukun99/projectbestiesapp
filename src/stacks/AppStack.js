import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import useUser, {updateUser, useUserId} from '../states/UserState';
import SignUp from '../screens/auth/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ThemedButton from '../components/ThemedButton';
import ThemedText from '../components/ThemedText';

export default function AppStack() {
  const user = useUser();
  const id = useUserId('yukunxu123@gmail.com');
  if (!user) {
    // what to do while loading user info from mongoDB
    // probably display some sort of loading screen?
    return <SignUp />;
  } else {
    return (
      <View>
        <View style={{marginTop: 30}}>
          <ThemedText text={"You're Logged In!"} style={styles.title} />
          <ThemedText text={`Welcome, ${user.name}`} style={styles.text} />
          <Button title="Sign Out" onPress={() => auth().signOut()} />
          <Button
            title="test"
            onPress={() =>
              updateUser(id, {
                name: undefined,
                email: auth().currentUser.email,
                age: undefined,
                year: 1,
                imgUrl:
                  'https://scontent.fsin9-1.fna.fbcdn.net/v/t31.18172-8/12977077_1073993765975019_6607428498084026554_o.jpg?_nc_cat=108&_nc_map=test-rt&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=wZq_sLltDRMAX-awyEr&_nc_ht=scontent.fsin9-1.fna&oh=bb1a9e670e630d6612819480af96bfd2&oe=60D0F39C',
                projects: undefined,
                posts: undefined,
                testResults: undefined,
                swiped: undefined,
                matches: undefined,
              })
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
