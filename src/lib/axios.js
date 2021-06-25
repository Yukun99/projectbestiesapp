import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://projectbesties-backend.herokuapp.com',
  baseURL: 'http://localhost:8001',
});

export default instance;
