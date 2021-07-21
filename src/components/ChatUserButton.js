import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import useColors from '../states/ThemeState';
import {dim} from '../lib/Dimensions';
import ThemedText from './ThemedText';
import {getRealmApp, useUserById} from '../states/UserState';
import {useMessages} from '../states/MessageState';
import {useChat} from '../states/ChatState';
import ThemedBlankImage from './ThemedBlankImage';

const WIDTH = dim.width;
const HEIGHT = dim.height;

export default function ChatUserButton({email, ...rest}) {
  const colors = useColors();
  const user = useUserById(getRealmApp().currentUser.id);
  const chat = useChat(email);
  const messages = useMessages(chat);
  let image;

  if (!user || !chat || !messages) {
    return null;
  }

  if (user.imgBase64) {
    image = (
      <Image
        source={{uri: `data:image/png;base64,${user.imgBase64}`}}
        style={styles.image}
      />
    );
  } else {
    image = <ThemedBlankImage style={styles.image} />;
  }

  if (messages.length === 0) {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
            },
          ]}
          {...rest}>
          {image}
          <ThemedText style={[styles.name]} text={user.name} />
          <ThemedText
            style={styles.newMessage}
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
        style={[
          styles.button,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
        {...rest}>
        {image}
        <ThemedText style={[styles.name]} text={user.name} />
        <ThemedText
          style={styles.newMessage}
          text={messages[messages.length - 1].message}
          truncate={0.15 * WIDTH}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderBottomWidth: 1,
    height: 0.15 * HEIGHT,
    width: WIDTH,
  },
  name: {
    position: 'absolute',
    left: 0.175 * HEIGHT,
    top: 0.025 * HEIGHT,
    fontSize: 0.025 * HEIGHT,
    fontWeight: 'bold',
  },
  image: {
    height: 0.12 * HEIGHT,
    width: 0.12 * HEIGHT,
    marginTop: 0.015 * HEIGHT,
    marginLeft: 0.015 * HEIGHT,
    borderRadius: 0.12 * HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newMessage: {
    position: 'absolute',
    left: 0.175 * HEIGHT,
    top: 0.08 * HEIGHT,
    fontSize: 0.0175 * HEIGHT,
    width: 0.35 * HEIGHT,
    paddingRight: 0.165 * WIDTH,
  },
});
