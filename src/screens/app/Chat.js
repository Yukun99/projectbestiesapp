import {
  setChat,
  updateChat,
  useChat,
  useChatId,
} from '../../states/UserState';
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {dim} from '../../lib/Dimensions';
import ChatUserPicture from '../../components/ChatUserPicture';
import ThemedText from '../../components/ThemedText';
import ChatList from './ChatList';
import useColors from '../../states/ThemeState';
import ThemedTextInput from '../../components/ThemedTextInput';
import {Icon} from 'react-native-elements';
import ContainButton from '../../components/ContainButton';
import io from 'socket.io-client';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Chat({self}) {
  const colors = useColors();
  const [current, setCurrent] = useState(self);
  let chat = useChat(current.email);
  const otherid = useChatId(current.email, self.email);
  const [message, setMessage] = useState('');

  function componentDidMount() {
    //get previous messages
    // eslint-disable-next-line react-hooks/rules-of-hooks
    chat = useChat(current.email);

    //start socket connections
    const socket = io(
      'https://projectbesties-backend.herokuapp.com/tinder/chats',
    );
    socket.connect();
    socket.on('incomingMessage', () => {
      console.log('test');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chat = useChat(current.email);
    });
  }

  // const ws = new WebSocket(
  //   'https://projectbesties-backend.herokuapp.com/tinder/chats',
  // );
  //
  // ws.addEventListener('message', function (event) {
  //   console.log('test');
  // });

  // ws.onopen = () => {
  //   console.log('test');
  // };

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

  if (!chat || !chat.messages) {
    return (
      <View style={styles.container}>
        <View style={[styles.topBar]}>
          <ChatUserPicture user={current} />
          <ThemedText text={current.name} style={styles.title} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView} />
        <ThemedTextInput
          label={'Type Message Here...'}
          value={message}
          onChangeText={data => setMessage(data)}
          style={styles.inputBox}
        />
        <ContainButton
          size={0.06 * HEIGHT}
          style={styles.sendButton}
          onPress={() => {
            if (message === '') {
              return;
            }
            if (chat) {
              const messages = [[self.email, Date.now(), message]];
              updateChat(chat._id, messages);
              updateChat(otherid, messages);
            } else {
              const messages = [[self.email, new Date(), message]];
              setChat(current.email, messages);
            }
            setMessage('');
          }}
          content={
            <Icon
              name={'paper-plane-outline'}
              type={'ionicon'}
              size={0.035 * HEIGHT}
              color={'#FF69B4'}
            />
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topBar,
          {borderBottomWidth: 1, borderColor: colors.border},
        ]}>
        <ChatUserPicture user={current} />
        <ThemedText text={current.name} style={styles.title} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {chat.messages.map((msg, i) => {
          const sender = msg[0];
          if (sender === current.email) {
            return (
              <View style={styles.messageContainer} key={i}>
                <ChatUserPicture
                  style={styles.messageIconLeft}
                  user={current}
                />
                <View style={styles.messageBubbleLeft}>
                  <ThemedText text={msg[2]} />
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.messageContainer} key={i}>
                <ChatUserPicture style={styles.messageIconRight} user={self} />
                <View style={styles.messageBubbleRight}>
                  <ThemedText text={msg[2]} />
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
      <ThemedTextInput
        label={'Type Message Here...'}
        value={message}
        onChangeText={data => setMessage(data)}
        style={styles.inputBox}
      />
      <ContainButton
        size={0.06 * HEIGHT}
        style={styles.sendButton}
        onPress={() => {
          if (message === '') {
            return;
          }
          let messages = chat.messages;
          messages[messages.length] = [self.email, new Date(), message];
          updateChat(chat._id, messages);
          updateChat(otherid, messages);
          setMessage('');
        }}
        content={
          <Icon
            name={'paper-plane-outline'}
            type={'ionicon'}
            size={0.035 * HEIGHT}
            color={'#FF69B4'}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    height: 0.1 * HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.01 * HEIGHT,
  },
  scrollView: {
    width: WIDTH,
    alignItems: 'center',
  },
  title: {
    fontSize: HEIGHT * 0.025,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    fontSize: HEIGHT * 0.05,
    width: WIDTH,
    zIndex: 2,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  inputBox: {
    margin: 0,
    paddingLeft: 10,
    width: '100%',
    bottom: 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  sendButton: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0.005 * HEIGHT,
    right: 0.007 * HEIGHT,
    transform: [{rotateZ: '45deg'}],
  },
  messageContainer: {
    width: WIDTH,
    justifyContent: 'flex-end',
    paddingTop: 0.00375 * HEIGHT,
    paddingBottom: 0.00375 * HEIGHT,
  },
  messageIconLeft: {
    position: 'absolute',
    left: 0.01 * HEIGHT,
  },
  messageIconRight: {
    position: 'absolute',
    right: 0.01 * HEIGHT,
  },
  messageBubbleLeft: {
    // position: 'absolute',
    left: 0.065 * HEIGHT,
    alignSelf: 'flex-start',
    backgroundColor: '#44dbd8',
    padding: 0.01 * HEIGHT,
    borderTopStartRadius: 0.0175 * HEIGHT,
    borderTopEndRadius: 0.0175 * HEIGHT,
    borderBottomEndRadius: 0.0175 * HEIGHT,
    borderBottomStartRadius: 0.005 * HEIGHT,
    maxWidth: WIDTH - 0.24 * WIDTH,
  },
  messageBubbleRight: {
    // position: 'absolute',
    right: 0.065 * HEIGHT,
    alignSelf: 'flex-end',
    backgroundColor: '#FF69B4',
    padding: 0.01 * HEIGHT,
    borderTopStartRadius: 0.0175 * HEIGHT,
    borderTopEndRadius: 0.0175 * HEIGHT,
    borderBottomStartRadius: 0.0175 * HEIGHT,
    borderBottomEndRadius: 0.005 * HEIGHT,
    maxWidth: WIDTH - 0.24 * WIDTH,
  },
});
