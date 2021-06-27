import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import useColors from '../states/ThemeState';
import {dim} from '../lib/Dimensions';
import ThemedText from './ThemedText';
import useUser from '../states/UserState';
import {useMessages} from '../states/MessageState';
import {useChat} from '../states/ChatState';

const WIDTH = dim.width;
const HEIGHT = dim.height;

export default function ChatUserButton({email, ...rest}) {
  const colors = useColors();
  const user = useUser(email);
  const chat = useChat(email);
  const messages = useMessages(chat);

  if (!user || !chat || !messages) {
    return null;
  }

  if (messages.length === 0) {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            height: 0.15 * HEIGHT,
            width: WIDTH,
          }}
          {...rest}>
          <Image
            source={{
              uri: user.imgUrl,
            }}
            style={{
              height: 0.12 * HEIGHT,
              width: 0.12 * HEIGHT,
              marginTop: 0.015 * HEIGHT,
              marginLeft: 0.015 * HEIGHT,
              borderRadius: 0.12 * HEIGHT,
            }}
          />
          <ThemedText
            style={{
              color: colors.text,
              position: 'absolute',
              left: 0.175 * HEIGHT,
              top: 0.025 * HEIGHT,
              fontSize: 0.025 * HEIGHT,
              fontWeight: 'bold',
            }}
            text={user.name}
          />
          <ThemedText
            style={{
              color: colors.text,
              position: 'absolute',
              left: 0.175 * HEIGHT,
              top: 0.08 * HEIGHT,
              fontSize: 0.0175 * HEIGHT,
              width: 0.35 * HEIGHT,
            }}
            text={'New match!'}
            color={'#FF69B4FF'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          height: 0.15 * HEIGHT,
          width: WIDTH,
        }}
        {...rest}>
        <Image
          source={{
            uri: user.imgUrl,
          }}
          style={{
            height: 0.12 * HEIGHT,
            width: 0.12 * HEIGHT,
            marginTop: 0.015 * HEIGHT,
            marginLeft: 0.015 * HEIGHT,
            borderRadius: 0.12 * HEIGHT,
          }}
        />
        <ThemedText
          style={{
            color: colors.text,
            position: 'absolute',
            left: 0.175 * HEIGHT,
            top: 0.025 * HEIGHT,
            fontSize: 0.025 * HEIGHT,
            fontWeight: 'bold',
          }}
          text={user.name}
        />
        <ThemedText
          style={{
            color: colors.text,
            position: 'absolute',
            left: 0.175 * HEIGHT,
            top: 0.065 * HEIGHT,
            fontSize: 0.0175 * HEIGHT,
            width: 0.35 * HEIGHT,
          }}
          text={messages[messages.length - 1].message}
        />
      </TouchableOpacity>
    </View>
  );
}
