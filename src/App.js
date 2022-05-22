import React, { useState } from 'react';
import './styles/app.scss';
import Login from './screens/login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './firebase/firebase';
import Home from './screens/home';
import SignOut from './screens/signOut';
import Header from './screens/header';
const auth = getAuth(firebaseApp);

function App() {

  const [user, setUser] = useState(null); 

  onAuthStateChanged(auth,(usuarioFirebase) => {
    if(usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <React.Fragment>
      <Header></Header>
      {user ? <SignOut></SignOut>:'' }
      {user ? 
        <Home
          emailUser={user.email}
        />:
        <Login/>
      }
    </React.Fragment>
  );
}

export default App;
