import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

const app =express()


const httpServer = createServer();
const io = new Server(httpServer, {
  cors:true
})

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("join-room",({email,roomId})=>{
      socket.join(roomId)
      socket.emit("room-joined",{roomId})
      socket.broadcast.to(roomId).emit("user-joined",{email})
      console.log(email,"user joined the room ",roomId)
  })
});



io.listen(4000);
app.listen(3000,()=>console.log("server listening"))