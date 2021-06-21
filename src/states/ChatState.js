import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import axios from '../lib/axios';

/**
 * Creates a new chat.
 * @param recipient Recipient to create a new chat with.
 */
export function createChat(recipient) {
  console.log('Creating new chat with recipient: ' + recipient + '...');
  axios
    .post('/tinder/chats', {
      members: [auth().currentUser.email, recipient],
    })
    .then(
      () => {
        console.log(
          'Created new chat with recipient: ' + recipient + ' successfully.',
        );
      },
      error => {
        console.log(error + ' from createChat');
      },
    );
}

/**
 * Fetch chat with specified recipient email.
 * Returns empty array if waiting for response.
 * Returns undefined if recipient is undefined.
 * @param recipient Recipient email to find chat for.
 * @returns {*|[]|undefined} Chat with specified recipient email.
 */
export function useChat(recipient) {
  console.log('Fetching chat with recipient: ' + recipient + '...');
  const user = auth().currentUser.email;
  const [chat, setChat] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        '/tinder/chats/find/' + user + '/' + recipient,
      );
      setChat(res.data);
    }

    fetchData().then(
      () => {
        console.log(
          'Fetched chat with recipient: ' + recipient + ' successfully.',
        );
      },
      error => {
        console.log(error + ' from useChat, email: ' + recipient);
      },
    );
  }, [user, recipient]);

  if (!recipient) {
    return undefined;
  }

  return chat;
}

/**
 * Fetch all chats involving current user.
 * Returns empty array if waiting for response.
 * @returns {[]|*} Array of all chats involving current user.
 */
function useChats() {
  console.log('Fetching all chats...');
  const user = auth().currentUser.email;
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/tinder/chats/find/' + user);
      setChats(res.data);
    }

    fetchData().then(
      () => {
        console.log('Fetched all chats successfully.');
      },
      error => {
        console.log(error + ' from useChats');
      },
    );
  }, [user]);

  return chats;
}

export default useChats;
