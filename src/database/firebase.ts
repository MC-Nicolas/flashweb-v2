import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCaR4xxDBRJHcucjSoQS0w-GFozLTDl5n4',
  authDomain: 'flash-38e5a.firebaseapp.com',
  projectId: 'flash-38e5a',
  storageBucket: 'flash-38e5a.appspot.com',
  messagingSenderId: '1079003717156',
  appId: '1:1079003717156:web:16f25937f3008884d602b1',
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export default database;
