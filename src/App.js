import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from './firebase';
import React, {useEffect} from 'react';
import firebase from 'firebase';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';


const App = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
      if(user){
        db.collection('users').doc(user.uid).set({
          email : user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          userImg : user.photoURL,
        }, {merge: true})
      }
  }, [user])

  if(!user) return <Login />

  return (
    <div style={{display : 'flex'}}>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default App;

