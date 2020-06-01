import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-radar-service.herokuapp.com',
});

export default api;
