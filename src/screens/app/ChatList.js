import ChatUserButton from '../../components/ChatUserButton';
import useUser, {useMatches} from '../../states/UserState';
import React from 'react';

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
