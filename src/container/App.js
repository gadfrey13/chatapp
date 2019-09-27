import React from 'react';
import Chat from '../component/Chat';
import User from '../component/User';
import io from 'socket.io-client';
import './App.css';
const socket = io('http://localhost:2000');

function App() {

  const [user, setUser] = React.useState('');

  const getUser = (userField) => {
    setUser(userField)
  }
  
  return (
    <div className="App">
        <User getUser={getUser} socket={socket} />
        <Chat user={user} socket={socket} />
    </div>
  );
}

export default App;

