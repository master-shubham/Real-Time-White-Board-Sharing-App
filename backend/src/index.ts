import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import {addUser, getUser, removeUser} from './utils/users'


export type RoomData = {
  name: string;
  userId: string;
  roomId: string;
  host: boolean;
  presenter: boolean;
  socketId?:string;
};

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: "*", // In production, replace with your specific frontend URL
  },
});

app.get("/", (req, res) => {
  res.send("This is MERN realtime whiteboard sharing app.");
});

let roomIdGlobal:string | null=null
let imgURLGlobal:string | null=null;

io.on("connection", (socket: Socket) => {
  // console.log(`User connected: ${socket.id}`);
  socket.on("userJoined",(data:RoomData)=>{
    const {name, userId, roomId, host, presenter} = data
    roomIdGlobal=roomId
    socket.join(roomId)
    const users = addUser({ name, userId, roomId, host, presenter,socketId:socket.id });
    socket.emit("userIsJoined", { success: true,users });
     socket.broadcast.to(roomId).emit("userIsJoinedMessage", name);
     socket.broadcast.to(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteboardDataResponse",{
      imgURL:imgURLGlobal,
    });
  })

  socket.on("whiteboardData",(data)=>{
    imgURLGlobal = data
    if (!roomIdGlobal) return;
    socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", {
      imgURL: data,
    });
  })

  socket.on("disconnect",()=>{
    const user = getUser(socket.id)
    console.log("diconnect",user);
    
    if (user) {
      removeUser(socket.id)
      socket.broadcast.to(roomIdGlobal!).emit("userLeftMessage",user.name)
    }
  })

})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
