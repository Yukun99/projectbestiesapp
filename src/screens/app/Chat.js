import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {dim} from '../../lib/Dimensions';
import ChatUserPicture from '../../components/ChatUserPicture';
import ThemedText from '../../components/ThemedText';
import ChatList from './ChatList';
import useColors from '../../states/ThemeState';
import ThemedTextInput from '../../components/ThemedTextInput';
import {Icon} from 'react-native-elements';
import ContainButton from '../../components/ContainButton';
import {useChat} from '../../states/ChatState';
import {createMessage, useMessages} from '../../states/MessageState';
import useUser from '../../states/UserState';
import io from 'socket.io-client';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function Chat({self}) {
  const colors = useColors();
  const [current, setCurrent] = useState(self.email);
  const other = useUser(current);
  const chat = useChat(current);
  let messages = useMessages(chat);
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:8001');

  // console.log(socket.current);
  socket.on('connect', () => {
    console.log('halsdl;kwl;kqg');
  });

  socket.on('example', data => {
    console.log(data);
  });

  console.log(socket);

  useEffect(() => {
    // socket.current.emit('newUser', self._id);
    // socket.current.on('getUsers', users => {
    //   console.log('users: ' + users);
    // });
    socket.on('getMessage', data => {
      console.log('hiasdhhashfhqwkhgqjhgioqwgyhqgyq');
    });
  }, []);

  if (!other || other.email === self.email) {
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

  const sendMessage = () => {
    if (message === '') {
      return null;
    }
    createMessage(chat._id, self._id, message);
    setMessage('');
    socket.current.emit('newMessage', {
      senderId: self._id,
      recipientId: other._id,
      msg: message,
    });
  };

  if (!chat) {
    return null;
  }

  if (!messages) {
    return (
      <View style={styles.container}>
        <View style={[styles.topBar]}>
          <ChatUserPicture user={other} self={false} />
          <ThemedText text={other.name} style={styles.title} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ThemedText
            text={'Loading messages, please wait...'}
            style={[styles.noMessages]}
            color={colors.border}
          />
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
          onPress={sendMessage}
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

  if (messages.length === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.topBar]}>
          <ChatUserPicture user={other} self={false} />
          <ThemedText text={other.name} style={styles.title} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ThemedText
            text={'No messages yet. Send something to start the conversation!'}
            style={[styles.noMessages]}
            color={colors.border}
          />
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
          onPress={sendMessage}
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
      <View style={[styles.topBar, {borderColor: colors.border}]}>
        <ChatUserPicture user={other} self={false} />
        <ThemedText text={other.name} style={styles.title} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {messages.map((msg, i) => {
          const sender = msg.senderID;
          if (sender === self._id) {
            return (
              <View style={styles.messageContainer} key={i}>
                <ChatUserPicture
                  style={styles.messageIconRight}
                  user={self}
                  self={true}
                />
                <View style={styles.messageBubbleRight}>
                  <ThemedText text={msg.message} />
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.messageContainer} key={i}>
                <ChatUserPicture
                  style={styles.messageIconLeft}
                  user={other}
                  self={false}
                />
                <View style={styles.messageBubbleLeft}>
                  <ThemedText text={msg.message} />
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
          createMessage(chat._id, self._id, message);
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
    borderBottomWidth: 1,
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
  noMessages: {
    fontSize: HEIGHT * 0.0175,
    textAlign: 'center',
    paddingTop: HEIGHT * 0.02,
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
