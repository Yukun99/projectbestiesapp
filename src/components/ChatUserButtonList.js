import ChatUserButton from './ChatUserButton';
import React from 'react';

export default function ChatUserButtonList({matches, setCurrent}) {
  console.log(Array.isArray(matches));
  return matches.map(user => {
    console.log(user._id);
    return (
      <ChatUserButton user={user} onPress={setCurrent(user)} key={user._id} />
    );
  });
}
