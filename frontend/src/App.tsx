import { Route, Routes } from 'react-router-dom';
import './App.css'
import Forms from './components/Form';
import RoomPage from './pages/RoomPage';

import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import type { RoomData } from './types';


const server:string = "http://localhost:5000";
const connectionOptions ={
  "force new connection":true,
  reconnectionAttempts:Infinity,
  timeout:10000,
  transports:["websocket"]
}

const socket: Socket = io(
  server,
  connectionOptions,
); 

function App() {

  const [user,setUser] = useState<RoomData | null>(null)

  useEffect(()=>{
    socket.on("userIsJoined",(data)=>{
      if (data.success) {
        console.log("userIsJoined");
      }else{
        console.log("userIsJoined error");
        
      }
    });
  },[])

  const uuid = ():string=>{
    let S4 = ():string=>{
      return (((1 + Math.random())*0x10000) | 0).toString(16).substring(1);
    };

    return(
      S4() +S4() +"-"+S4() +"-"+S4() +"-"+S4() +"-"+S4() +S4() +S4()
    );

  };

  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App
