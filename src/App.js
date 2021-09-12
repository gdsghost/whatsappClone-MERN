import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import axios from "./axios"; 

function App() {
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
     .then(response => {
       setMessages(response.data);
     })
  },[]);

  useEffect(() => {
    const pusher = new Pusher('f652f285f13e96c79cfc', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages,newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
