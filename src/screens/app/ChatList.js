import ChatUserButton from '../../components/ChatUserButton';
import useChats from '../../states/ChatState';
import React, {useState} from 'react';
import Chat from './Chat';
import {ScrollView, StyleSheet, View} from 'react-native';
import ThemedText from '../../components/ThemedText';
import useColors from '../../states/ThemeState';
import {dim} from '../../lib/Dimensions';
import BackButton from '../../components/BackButton';
import {getCurrentUserEmail} from '../../states/UserState';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function ChatList() {
  const chats = useChats();
  const [current, setCurrent] = useState(undefined);
  const colors = useColors();

  if (!chats) {
    // waiting for data, display nothing
    return null;
  }

  if (chats.length === 0) {
    // no matches yet, suggest for user to go find some
    return (
      <View style={styles.container}>
        <ThemedText
          style={[styles.list, {borderBottomColor: colors.border}]}
          text={'Your Matches'}
        />
        <View style={styles.emptyContainer}>
          <ThemedText
            text={'You have no matches.'}
            style={[styles.emptyText]}
            color={colors.border}
          />
          <ThemedText
            text={'Swipe around to find some!'}
            style={[styles.emptyText]}
            color={colors.border}
          />
        </View>
      </View>
    );
  }

  const matches = chats.map(chat => {
    const members = chat.members;
    return members.filter(item => {
      return item !== getCurrentUserEmail();
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
      <BackButton onPress={() => setCurrent(undefined)} />
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 0.025 * HEIGHT,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 0.06 * WIDTH,
  },
  backButton: {
    zIndex: 1,
    left: 0.02 * HEIGHT,
    top: 0.02 * HEIGHT,
    position: 'absolute',
  },
  list: {
    fontSize: 0.05 * HEIGHT,
    height: 0.095 * HEIGHT,
    width: WIDTH,
    zIndex: 2,
    borderBottomWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
