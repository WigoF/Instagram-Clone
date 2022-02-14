import './App.css';
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import {db} from './firebase';
import Header from './Header';


function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
     

     <Header setUser={setUser} user={user}></Header>
      
    </div>
  );
}

export default App;
