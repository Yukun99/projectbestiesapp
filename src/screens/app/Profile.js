import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import useColors from '../../states/ThemeState';
import {useColorScheme} from 'react-native-appearance';
import ThemedText from '../../components/ThemedText';
import useUser from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import {Button, Icon} from 'react-native-elements';
import IconButton from '../../components/IconButton';

const HEIGHT = dim.height;
const WIDTH = dim.width;
export default function Profile(props) {
  const colors = useColors();
  const user = useUser();

  if (!user) {
    return null;
  }
  return (
    <View style={[{backgroundColor: colors.background}, styles.container]}>
      <Image
        source={{uri: `${user.imgUrl}`}}
        style={{
          width: 0.4 * HEIGHT,
          height: 0.4 * HEIGHT,
          borderRadius: HEIGHT * 0.4,
        }}
      />
      <ThemedText text={`${user.name}`} style={styles.name} />
      <View>
        <IconButton
          style={{
            width: 0.07 * HEIGHT,
            height: 0.07 * HEIGHT,
            borderRadius: HEIGHT * 0.07,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: WIDTH * 0.2,
            top: 0.05 * HEIGHT,
          }}
          name={'setting'}
          type={'antdesign'}
          size={35}
        />
        <IconButton
          style={{
            width: 0.07 * HEIGHT,
            height: 0.07 * HEIGHT,
            borderRadius: HEIGHT * 0.07,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: WIDTH * 0.2,
            top: 0.05 * HEIGHT,
            paddingLeft: 0.007 * WIDTH,
          }}
          name={'logout'}
          type={'antdesign'}
          size={30}
        />
      </View>
      <IconButton
        style={{
          width: 0.1 * HEIGHT,
          height: 0.1 * HEIGHT,
          borderRadius: HEIGHT * 0.1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: HEIGHT * 0.07,
        }}
        name={'pencil'}
        type={'evilicon'}
        size={55}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 25,
    marginTop: 30,
  },
  icon: {
    height: 50,
    width: 50,
  },
});
