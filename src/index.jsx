import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

import App from './components/App'
 
firebase.initializeApp({
  apiKey: 'AIzaSyDJi4I5rXIENxD2RFyWF5W3LmYYgGwFTMg',
  authDomain: 'curso-react-81033.firebaseapp.com',
  databaseURL: 'https://curso-react-81033.firebaseio.com',
  projectId: 'curso-react-81033',
  storageBucket: '',
  messagingSenderId: '994608383274'
});

render(<App />, document.getElementById('root'))