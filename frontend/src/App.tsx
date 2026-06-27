import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ToastContainer, toast } from "react-toastify";

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
  const [users,setUsers] = useState([])

  useEffect(()=>{
    socket.on("userIsJoined",(data)=>{
      if (data.success) {
        console.log("userIsJoined");
         setUsers(data.users);
      }else{
        console.log("userIsJoined error");
        
      }
    });
    
    socket.on("allUsers",(data)=>{
      setUsers(data)
    })

    socket.on("userIsJoinedMessage",(data)=>{
      toast.info(`${data} joined the room`)
    });
    
    socket.on("userLeftMessage", (data) => {
      toast.info(`${data} left the room`);
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
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users} />} />
      </Routes>
    </div>
  );
}

export default App
