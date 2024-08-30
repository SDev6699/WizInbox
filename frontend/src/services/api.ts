import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Replace this with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
