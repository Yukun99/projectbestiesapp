import useUser, {useChat} from '../../states/UserState';
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {dim} from '../../lib/Dimensions';
import ChatUserPicture from '../../components/ChatUserPicture';
import ThemedText from '../../components/ThemedText';
import ChatList from './ChatList';
import useColors from '../../states/ThemeState';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Chat({self}) {
  const colors = useColors();
  const [current, setCurrent] = useState(self);
  const messages = useChat(current.email);

  if (!current || current === self) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ThemedText
            style={[styles.list, {borderBottomColor: colors.border}]}
            text={'Your Matches'}
          />
          <ChatList press={setCurrent} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, {borderBottomWidth: 1, borderColor: colors.border}]}>
        <ChatUserPicture user={current} />
        <ThemedText text={current.name} style={styles.title} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>{}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    height: 0.13 * HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: WIDTH,
    alignItems: 'center',
  },
  title: {
    marginTop: HEIGHT * 0.01,
    fontSize: HEIGHT * 0.025,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    marginTop: HEIGHT * 0.01,
    fontSize: HEIGHT * 0.06,
    width: WIDTH,
    zIndex: 2,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
});
