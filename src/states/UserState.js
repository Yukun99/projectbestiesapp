import axios from '../lib/axios';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export function updateUser(id, props) {
  const newUser = {
    _id: id,
  };
  const keys = Object.keys(props);
  const values = Object.values(props);
  for (let i = 0; i < keys.length; ++i) {
    if (values[i]) {
      newUser[keys[i]] = values[i];
    }
  }
  axios.put('/tinder/users/:id', newUser).then(
    res => {
      console.log('Starting data update to database');
      console.log(`status: ${res.status}`);
    },
    error => {
      console.log(error);
    },
  );
}

export function setUser(name, email, age, year, imgUrl, projects) {
  axios
    .post('/tinder/users', {
      name: name,
      email: email,
      age: age,
      year: year,
      imgUrl: imgUrl,
      projects: projects,
      creationDate: new Date(),
    })
    .then(
      res => {
        console.log('Starting data transfer to database');
        console.log(`status: ${res.status}`);
      },
      error => {
        console.log(error);
      },
    );
}

export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/users');

      setUsers(req.data);
    }

    fetchData();
  }, []);

  const res = users.filter(item => {
    return item.email !== auth().currentUser.email;
  });

  return res;
}

function useUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/users');

      setUsers(req.data);
    }

    fetchData();
  }, []);

  const user = users
    .filter(item => {
      return item.email === auth().currentUser.email;
    })
    .pop();

  if (user) {
    return user;
  }
}

export function useUserId(email) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/users');

      setUsers(req.data);
    }

    fetchData();
  }, []);

  if (users) {
    const user = users.filter(item => item.email === email).pop();
    if (user) {
      return user._id;
    }
  }
}

export function useUserByEmail(email) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/users');

      setUsers(req.data);
    }

    fetchData();
  }, []);

  if (users) {
    const user = users.filter(item => item.email === email).pop();
    if (user) {
      return user;
    }
  }
}

export function useMatches() {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/users');

      setUsers(req.data);
      setUsers2(req.data);
    }

    fetchData();
  }, []);

  const user = users
    .filter(item => {
      return item.email === auth().currentUser.email;
    })
    .pop();

  if (user) {
    const res = users2.filter(item => {
      return (
        item.matches.includes(user.email) && user.matches.includes(item.email)
      );
    });
    return res;
  }
}

export function useChat(recipient) {
  const user = auth().currentUser.email;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/chats');

      setChats(req.data);
    }

    fetchData();
  }, []);

  if (!recipient) {
    return null;
  }

  const chat = chats
    .filter(item => {
      return item.from === user && item.to === recipient;
    })
    .pop();
}

export default useUser;
