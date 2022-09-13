import axios from 'axios'
import getCookie from './getCookie'

const request = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('X-CSRFToken')
  },
  withCredentials: true
})

export default request
