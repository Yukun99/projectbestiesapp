import axios from '../lib/axios';
import {useEffect, useState} from 'react';
import Realm from 'realm';

const appid = 'projectbesties-login-znmgf';
const config = {
  id: appid,
};
const app = new Realm.App(config);

export function getCurrentUserEmail() {
  return app.currentUser.profile.email;
}

export function getRealmApp() {
  return app;
}

/**
 * Creates a new user.
 * @param id Id to save user under. Used for user tracking.
 * @param name Full name of new user.
 * @param email Email of new user.
 * @param age Age of new user.
 * @param year Year of study of new user.
 * @param imgBase64 Image of new user, encoded as Base64.
 * @param linkedInUrl LinkedIn URL of new user.
 * @param projects Projects done by new user.
 * @param confirmed Whether user has confirmed their account via their NUS email.
 */
export function createUser(
  id,
  name,
  email,
  age,
  year,
  imgBase64,
  linkedInUrl,
  projects,
  confirmed,
) {
  console.log('Creating new user with email: ' + email + '...');
  if (id) {
    axios
      .post('/tinder/users', {
        _id: id,
        name: name,
        email: email,
        age: age,
        year: year,
        imgBase64: imgBase64,
        linkedInUrl: linkedInUrl,
        projects: projects,
        confirmed: confirmed,
      })
      .then(
        () => {
          console.log(
            'Created new user with email: ' + email + ' successfully.',
          );
        },
        error => {
          console.log(error + ' from createUser');
        },
      );
    return;
  }
  axios
    .post('/tinder/users', {
      name: name,
      email: email,
      age: age,
      year: year,
      imgBase64: imgBase64,
      linkedInUrl: linkedInUrl,
      projects: projects,
      confirmed: confirmed,
    })
    .then(
      () => {
        console.log('Created new user with email: ' + email + ' successfully.');
      },
      error => {
        console.log(error.error + ' from createUser');
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

  if (!user || !email) {
    return undefined;
  }

  return user;
}

/**
 * Fetch user with specified id.
 * Returns current if id is undefined.
 * Returns undefined if waiting for response.
 * @param id Id to find user for.
 * @param isUser
 * @returns {*|undefined} User with specified Id.
 */
export function useUserById(id, isUser) {
  if (isUser) {
    if (id) {
      id = id.id;
    }
  }
  const [user, setUser] = useState(null);
  console.log('Fetching user with id: ' + id + '...');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/tinder/users/find/' + id);
      setUser(res.data);
    }

    fetchData().then(
      () => {
        console.log('Fetched user with id: ' + id + ' successfully.');
      },
      error => {
        console.log(error + ' from useUserById');
      },
    );
  }, [id]);

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
export function useUsers(user) {
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

  if (!user) {
    return [];
  }

  return users.filter(item => {
    return item.email !== user.email;
  });
}

/**
 * Updates information about user with specified id stored in the database.
 * @param id User ID of user to update information for.
 * @param props Fields to update for the user, in JSON format.
 */
export function updateUser(id, props) {
  console.log('Updating user database...');
  let update = false;
  const newUser = {
    _id: id,
  };
  const keys = Object.keys(props);
  const values = Object.values(props);
  for (let i = 0; i < keys.length; ++i) {
    if (keys[i] === '_id' && values[i] !== id) {
      update = true;
    }
    if (values[i]) {
      newUser[keys[i]] = values[i];
    }
  }
  if (update) {
    axios.delete('/tinder/users/' + app.currentUser.profile.email).then(
      () => {
        console.log('Deleted user successfully.');
      },
      error => {
        console.log(error + ' from deleteUser');
      },
    );
    createUser(
      newUser._id,
      newUser.name,
      newUser.email,
      newUser.age,
      newUser.year,
      newUser.imgBase64,
      newUser.linkedInUrl,
      newUser.projects,
      true,
    );
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
  const email = app.currentUser.profile.email;
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
