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

export default useUser;
