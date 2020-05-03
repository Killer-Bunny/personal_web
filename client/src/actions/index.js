import axios from 'axios';

export function auth(){
  const request = axios.get('/api/auth')
                  .then(response=>response.data)


  return {
    type: 'USER_AUTH',
    payload: request
  }
}

export function getContent(pageName) {
  const request = axios.get(`/api/display?page=${pageName}`)
                  .then(response=>response.data);

  return {
    type: 'GET_CONTENT',
    payload: request
  }
}

export function submitDetails(details) {
  const request = axios.post(`/api/contact`,details)
                  .then(response => response.data);

  return {
    type: 'INSERT_CONTACT',
    payload: request
  }
}

export function login(user) {
  const request = axios.post('/api/login', user)
                  .then(response => response.data)

  return {
    type: 'LOGIN',
    payload: request
  }
}

export function getDetails() {
  const request = axios.get('/api/getcontact')
                  .then(response => response.data)
  
  return {
    type: 'GET_CONTACTS',
    payload: request
  }
}
