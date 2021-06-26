import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://projectbesties-backend.herokuapp.com',
});

export default instance;
