import auth from '@react-native-firebase/auth';
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
            'from sender: ' +
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
 * Fetch messages with specified chat ID.
 * Returns empty array if waiting for response.
 * Returns undefined if chat ID is undefined.
 * @param chatId Chat ID to find messages for.
 * @returns {*|[]|undefined} Array of messages with specified chat ID.
 */
export function useMessages(chatId) {
  console.log('Fetching messages in chat: ' + chatId + '...');
  const user = auth().currentUser.email;
  const [messages, setMessages] = useState([]);

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
  }, [user, chatId]);

  if (!chatId) {
    return undefined;
  }

  return messages;
}
