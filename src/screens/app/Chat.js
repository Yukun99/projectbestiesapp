import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {dim} from '../../lib/Dimensions';
import ChatUserPicture from '../../components/ChatUserPicture';
import ThemedText from '../../components/ThemedText';
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

export default function Chat({current}) {
  const colors = useColors();
  const self = useUser();
  const other = useUser(current);
  const chat = useChat(current);
  const messages = useMessages(chat);
  const [incMessage, setIncMessage] = useState(null);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();
  const socket = io('http://projectbesties-backend.herokuapp.com');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected! Sending our information.');
      if (self) {
        socket.emit('addUser', {
          userID: self._id,
        });
      }
      console.log('Information successfully sent.');
    });
  });

  socket.on('newMessage', ({msg}) => {
    console.log('New message received with contents: ' + msg);
    const newMessage = {
      message: msg,
      self: false,
    };
    setIncMessage(newMessage);
    console.log('New message successfully displayed.');
  });

  useEffect(() => {
    if (incMessage) {
      messages.push(incMessage);
      setIncMessage(null);
    }
  }, [incMessage, messages]);

  const sendMessage = () => {
    if (message === '') {
      return null;
    }
    createMessage(chat._id, self._id, message);
    console.log('New message created with contents: ' + message);
    const newMessage = {
      message: message,
      self: true,
    };
    messages.push(newMessage);
    console.log('New message successfully displayed.');
    socket.emit('newMessage', {
      recipientId: other._id,
      message: message,
    });
    setMessage('');
  };

  if (!other || !self || !chat) {
    return null;
  }

  if (!messages) {
    return (
      <View style={styles.container}>
        <View style={[styles.topBar, {borderColor: colors.border}]}>
          <ChatUserPicture user={other} self={false} />
          <ThemedText text={other.name} style={styles.title} />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({
              animated: true,
            });
          }}>
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
        <View style={[styles.topBar, {borderColor: colors.border}]}>
          <ChatUserPicture user={other} self={false} />
          <ThemedText text={other.name} style={styles.title} />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({
              animated: true,
            });
          }}>
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
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd({
            animated: true,
          });
        }}
        contentContainerStyle={styles.scrollView}>
        {messages.map((msg, i) => {
          if (
            (msg.senderID && msg.senderID === self._id) ||
            (msg.self && msg.self === true)
          ) {
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
  backButton: {
    zIndex: 1,
    left: 0.01 * HEIGHT,
    top: 0.01 * HEIGHT,
    position: 'absolute',
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
    width: WIDTH,
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
    backgroundColor: '#27c1bf',
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
