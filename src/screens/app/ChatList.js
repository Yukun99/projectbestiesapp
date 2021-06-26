import ChatUserButton from '../../components/ChatUserButton';
import useChats from '../../states/ChatState';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Chat from './Chat';
import {ScrollView, StyleSheet, View} from 'react-native';
import ThemedText from '../../components/ThemedText';
import useColors from '../../states/ThemeState';
import {dim} from '../../lib/Dimensions';
import {Icon} from 'react-native-elements';
import ContainButton from '../../components/ContainButton';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function ChatList() {
  const chats = useChats();
  const [current, setCurrent] = useState(undefined);
  const colors = useColors();

  // waiting for data, display nothing
  if (!chats || chats.length === 0) {
    return null;
  }

  const matches = chats.map(chat => {
    const members = chat.members;
    return members.filter(item => {
      return item !== auth().currentUser.email;
    })[0];
  });

  if (!current) {
    // data found, display it
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ThemedText
            style={[styles.list, {borderBottomColor: colors.border}]}
            text={'Your Matches'}
          />
          {matches.map((user, i) => {
            return (
              <ChatUserButton
                email={user}
                onPress={() => setCurrent(user)}
                key={i}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ContainButton
        size={0.07 * HEIGHT}
        style={styles.backButton}
        borderColor={colors.background}
        onPress={() => setCurrent(undefined)}
        content={
          <Icon
            name={'arrow-back'}
            type={'material'}
            size={35}
            color={'#FF69B4'}
          />
        }
      />
      <Chat current={current} setCurrent={setCurrent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
    width: WIDTH,
    alignItems: 'center',
  },
  backButton: {
    zIndex: 1,
    left: 0.02 * HEIGHT,
    top: 0.02 * HEIGHT,
    position: 'absolute',
  },
  list: {
    fontSize: HEIGHT * 0.05,
    width: WIDTH,
    zIndex: 2,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
});
