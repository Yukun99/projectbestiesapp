import {ScrollView, StyleSheet, View} from 'react-native';
import ChatUserButton from '../../components/ChatUserButton';
import useUser, {useMatches} from '../../states/UserState';
import {dim} from '../../lib/Dimensions';
import React, {useEffect, useState} from 'react';
import ThemedText from '../../components/ThemedText';
import useColors from '../../states/ThemeState';
import Chat from './Chat';
import ChatUserButtonList from '../../components/ChatUserButtonList';

const HEIGHT = dim.height;
const WIDTH = dim.width;

export default function ChatList({press}) {
  const matches = useMatches();
  const self = useUser();

  if (!self || !matches || !Array.isArray(matches)) {
    return null;
  }
  return matches.map(user => {
    if (user === self) {
      return null;
    }
    return (
      <ChatUserButton user={user} press={() => press(user)} key={user._id} />
    );
  });
}
