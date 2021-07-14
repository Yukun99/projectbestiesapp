import axios from '../lib/axios';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

/**
 * Creates a new user.
 * @param name Full name of new user.
 * @param email Email of new user.
 * @param age Age of new user.
 * @param year Year of study of new user.
 * @param imgBase64 Image of new user, encoded as Base64.
 * @param linkedInUrl LinkedIn URL of new user.
 * @param projects Projects done by new user.
 */
export function createUser(
  name,
  email,
  age,
  year,
  imgBase64,
  linkedInUrl,
  projects,
) {
  console.log('Creating new user with email: ' + email + '...');
  axios
    .post('/tinder/users', {
      name: name,
      email: email,
      age: age,
      year: year,
      imgBase64: imgBase64,
      linkedInUrl: linkedInUrl,
      projects: projects,
    })
    .then(
      () => {
        console.log('Created new user with email: ' + email + ' successfully.');
      },
      error => {
        console.log(error + ' from createUser');
      },
    );
}

/**
 * Fetch user with specified email.
 * Returns current if email is undefined.
 * Returns undefined if waiting for response.
 * @param email Email to find user for.
 * @returns {*|undefined} User with specified email.
 */
function useUser(email) {
  if (!email) {
    email = auth().currentUser.email;
  }
  const [user, setUser] = useState(undefined);
  console.log('Fetching user with email: ' + email + '...');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/tinder/users/' + email);
      setUser(res.data);
    }

    fetchData().then(
      () => {
        console.log('Fetched user with email: ' + email + ' successfully.');
      },
      error => {
        console.log(error + ' from useUser');
      },
    );
  }, [email]);

  if (!user) {
    return undefined;
  }

  return user;
}

/**
 * Fetch all users except current user.
 * Returns empty if waiting for response.
 * @returns {[]|*} Array of all users except current user.
 */
export function useUsers() {
  console.log('Fetching all users...');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/tinder/users');
      setUsers(res.data);
    }

    fetchData().then(
      () => {
        console.log('Fetched all users successfully.');
      },
      error => {
        console.log(error + ' from useUsers');
      },
    );
  }, []);

  return users.filter(item => {
    return item.email !== auth().currentUser.email;
  });
}

/**
 * Updates information about user with specified id stored in the database.
 * @param id User ID of user to update information for.
 * @param props Fields to update for the user, in JSON format.
 */
export function updateUser(id, props) {
  console.log('Updating user database...');
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
    () => {
      console.log('Updated user database successfully.');
    },
    error => {
      console.log(error + ' from updateUser');
    },
  );
}

/**
 * Deletes all data related to current user from the database.
 */
export function deleteUser() {
  const email = auth().currentUser.email;
  console.log('Deleting user...');
  axios.delete('/tinder/users/' + email).then(
    () => {
      console.log('Deleted user successfully.');
    },
    error => {
      console.log(error + ' from deleteUser');
    },
  );
}

export default useUser;
