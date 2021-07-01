import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import useColors from '../../states/ThemeState';
import ThemedText from '../../components/ThemedText';
import useUser from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import ContainButton from '../../components/ContainButton';
import {Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import EditProfile from './EditProfile';

const HEIGHT = dim.height;
const WIDTH = dim.width;
export default function Profile() {
  const colors = useColors();
  const user = useUser();
  const [edit, setEdit] = useState(false);

  if (edit) {
    return (
      <EditProfile
        editInfo={() => {
          setEdit(false);
        }}
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <View style={[{backgroundColor: colors.background}, styles.container]}>
      <ThemedText text={'Profile'} style={styles.title} />
      <View style={[{backgroundColor: colors.border}, styles.frame]} />
      <Image source={{uri: `${user.imgUrl}`}} style={styles.image} />
      <ThemedText text={`${user.name}`} style={styles.name} />
      <ThemedText text={`${user.age}`} style={styles.age} />
      <View>
        <ContainButton
          size={0.07 * HEIGHT}
          style={styles.leftButton}
          borderColor={colors.text}
          content={
            <Icon
              name={'setting'}
              type={'antdesign'}
              size={35}
              color={colors.text}
            />
          }
        />
        <ContainButton
          size={0.07 * HEIGHT}
          style={styles.rightButton}
          onPress={() => auth().signOut()}
          borderColor={colors.text}
          content={
            <Icon
              name={'logout'}
              type={'antdesign'}
              size={30}
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
            size={55}
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
  },
  name: {
    fontSize: HEIGHT * 0.04,
    marginTop: HEIGHT * 0.02,
  },
  age: {
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
