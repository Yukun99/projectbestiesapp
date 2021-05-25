import axios from '../lib/axios';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export function updateUser(email, fieldType, value) {
  const id = getUser(email).id;
  if (id) {
    axios
      .put('/tinder/users', {
        _id: id,
        fieldType: value,
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
}

//https://scontent.fsin9-1.fna.fbcdn.net/v/t31.18172-8/12977077_1073993765975019_6607428498084026554_o.jpg?_nc_cat=108&_nc_map=test-rt&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=wZq_sLltDRMAX-awyEr&_nc_ht=scontent.fsin9-1.fna&oh=bb1a9e670e630d6612819480af96bfd2&oe=60D0F39C
export function setUser(name, email, age, year, imgUrl, projects) {
  axios
    .post(
      '/tinder/users',
      {
        name: name,
        email: email,
        age: age,
        year: year,
        imgUrl: imgUrl,
        projects: projects,
        creationDate: new Date(),
      },
      {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    )
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

function getUser(email) {
  async function fetchData() {
    return await axios.get('/tinder/users');
  }

  const users = fetchData();
  console.log(users.data);

  if (users) {
    if (users.data) {
      console.log(users.data);
      const user = users.data
        .filter(item => {
          return item.email === email;
        })
        .pop();

      if (user) {
        return user;
      }
    }
  }
}

export default useUser;
