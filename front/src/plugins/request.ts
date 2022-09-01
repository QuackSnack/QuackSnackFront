import axios from 'axios'
import getCookie from './getCookie'

const request = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 3000,
  headers: {
    Accept: 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-CSRFToken': getCookie('X-CSRFToken'),
  },
  withCredentials: true,
});

export default request
