import ChatUserButton from '../../components/ChatUserButton';
import useChats from '../../states/ChatState';
import React from 'react';
import auth from '@react-native-firebase/auth';

export default function ChatList({press}) {
  const chats = useChats();

  // waiting for data, display nothing
  if (!chats) {
    return null;
  }

  const matches = chats.map(chat => {
    const members = chat.members;
    return members.filter(item => {
      return item !== auth().currentUser.email;
    })[0];
  });

  // data found, display it
  return matches.map((user, i) => {
    return <ChatUserButton user={user} press={() => press(user)} key={i} />;
  });
}
