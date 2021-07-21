import {useEffect, useState} from 'react';
import axios from '../lib/axios';

/**
 * Creates a new message.
 * @param chatID ID of chat that message belongs in.
 * @param senderID ID of sender that sent the message.
 * @param message Contents of the message.
 */
export function createMessage(chatID, senderID, message) {
  console.log(
    'Creating new message in chat: ' +
      chatID +
      'from sender: ' +
      senderID +
      '...',
  );
  console.log('Message contents: ' + message);
  axios
    .post('/tinder/messages', {
      message: message,
      senderID: senderID,
      chatID: chatID,
    })
    .then(
      () => {
        console.log(
          'Created new message in chat: ' +
            chatID +
            ' from sender: ' +
            senderID +
            ' successfully.',
        );
      },
      error => {
        console.log(error + ' from createMessage');
      },
    );
}

/**
 * Fetch messages with specified chat.
 * Returns undefined if waiting for response or chat is undefined.
 * @param chat Chat to find messages for.
 * @returns {*|undefined} Array of messages with specified chat.
 */
export function useMessages(chat) {
  let chatId = '';
  if (chat && !Array.isArray(chat)) {
    chatId = chat._id;
  }
  console.log('Fetching messages in chat: ' + chatId + '...');
  const [messages, setMessages] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/messages/' + chatId);
      setMessages(req.data);
    }

    fetchData().then(
      () => {
        console.log('Fetched messages in chat: ' + chatId + ' successfully.');
      },
      error => {
        console.log(error + ' from useMessages');
      },
    );
  }, [chatId]);

  return messages;
}

export function deleteMessages(chats) {
  console.log('Deleting all messages...');
  try {
    chats.map(chat => {
      axios.delete('/tinder/messages/' + chat._id).then(
        () => {},
        error => {
          console.log(error + ' from deleteMessages');
        },
      );
    });
    console.log('Deleted user successfully.');
  } catch (error) {
    console.log(error + ' from deleteMessages');
  }
}
