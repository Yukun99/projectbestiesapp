import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import useColors from '../../../states/ThemeState';
import ThemedText from '../../../components/ThemedText';
import {getRealmApp, updateUser, useUserById} from '../../../states/UserState';
import {dim} from '../../../lib/Dimensions';
import ContainButton from '../../../components/ContainButton';
import {Icon} from 'react-native-elements';
import EditProfile from './EditProfile';
import Settings from './Settings';
import ThemedBlankImage from '../../../components/ThemedBlankImage';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Profile({logout}) {
  const colors = useColors();
  const user = useUserById(getRealmApp().currentUser, true);
  const [edit, setEdit] = useState(false);
  const [settings, setSettings] = useState(false);
  const [newuser, setNewuser] = useState(null);
  const [displayed, setDisplayed] = useState(null);

  useEffect(() => {
    if (user && !newuser) {
      setDisplayed(user);
    }
  }, [newuser, user]);

  useEffect(() => {
    if (newuser) {
      setDisplayed(newuser);
      updateUser(newuser._id, newuser);
    }
  }, [newuser]);

  if (edit) {
    return (
      <EditProfile
        editProfile={() => {
          setEdit(false);
        }}
        updateUser={data => setNewuser(data)}
      />
    );
  }

  if (settings) {
    return (
      <Settings
        editSettings={() => {
          setSettings(false);
        }}
      />
    );
  }

  if (!displayed) {
    return null;
  }

  const image = displayed.imgBase64 ? (
    <Image
      source={{uri: `data:image/png;base64,${displayed.imgBase64}`}}
      style={[styles.image, {borderColor: colors.border}]}
    />
  ) : (
    <ThemedBlankImage style={[styles.image, {borderColor: colors.border}]} />
  );

  return (
    <View style={[{backgroundColor: colors.background}, styles.container]}>
      <ThemedText text={'Profile'} style={styles.title} />
      <View style={[{backgroundColor: colors.border}, styles.frame]} />
      {image}
      <ThemedText text={`${displayed.name}`} style={styles.name} />
      <ThemedText text={`Year ${displayed.year}`} style={styles.year} />
      <ThemedText text={`${displayed.testResults}`} style={styles.year} />
      <View>
        <ContainButton
          size={0.07 * HEIGHT}
          style={styles.leftButton}
          onPress={() => setSettings(true)}
          borderColor={colors.text}
          content={
            <Icon
              name={'setting'}
              type={'antdesign'}
              size={0.045 * HEIGHT}
              color={colors.text}
            />
          }
        />
        <ContainButton
          size={0.07 * HEIGHT}
          style={styles.rightButton}
          onPress={() => {
            logout();
          }}
          borderColor={colors.text}
          content={
            <Icon
              name={'logout'}
              type={'antdesign'}
              size={0.04 * HEIGHT}
              color={colors.text}
            />
          }
        />
      </View>
      <ContainButton
        size={0.1 * HEIGHT}
        style={styles.mainButton}
        onPress={() => setEdit(true)}
        borderColor={colors.text}
        content={
          <Icon
            name={'pencil'}
            type={'evilicon'}
            size={0.07 * HEIGHT}
            color={colors.text}
          />
        }
      />
    </View>
  );
}

// noinspection JSSuspiciousNameCombination
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    top: HEIGHT * 0.025,
    fontSize: HEIGHT * 0.05,
    zIndex: 1,
  },
  frame: {
    position: 'absolute',
    height: HEIGHT,
    width: HEIGHT,
    top: -HEIGHT * 0.33,
    borderRadius: HEIGHT * 0.5,
    opacity: 0.75,
  },
  image: {
    width: 0.4 * HEIGHT,
    height: 0.4 * HEIGHT,
    borderRadius: 0.2 * HEIGHT,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: HEIGHT * 0.04,
    marginTop: HEIGHT * 0.02,
  },
  year: {
    fontSize: HEIGHT * 0.025,
  },
  icon: {
    height: 50,
    width: 50,
  },
  rightButton: {
    position: 'absolute',
    left: 0.2 * WIDTH,
    top: 0.05 * HEIGHT,
  },
  leftButton: {
    position: 'absolute',
    right: 0.2 * WIDTH,
    top: 0.05 * HEIGHT,
  },
  mainButton: {
    marginTop: 0.07 * HEIGHT,
  },
});
