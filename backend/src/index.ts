import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

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

let roomIdGlobal:string | null=null,imgURLGlobal:string | null=null;

io.on("connection", (socket: Socket) => {
  // console.log(`User connected: ${socket.id}`);
  socket.on("userJoined",(data)=>{
    const {name, userId, roomId, host, presenter} = data
    roomIdGlobal=roomId
    socket.join(roomId)
    socket.emit("userIsJoined",{success:true})
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

})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
