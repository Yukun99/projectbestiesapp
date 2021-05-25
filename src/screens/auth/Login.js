import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { GoogleSigninButton } from "@react-native-community/google-signin";

export default function Login(props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Log In With Google</Text>

      {/*google sign in button prop, looks pretty legit*/}
      <GoogleSigninButton onPress={props.onGoogleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
  },
});
