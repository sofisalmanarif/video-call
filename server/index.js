import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

const app =express()


const httpServer = createServer();
const io = new Server(httpServer, {
  cors:true
})
const emailToSocketmapping = new Map()
const socketToEmailMapping = new Map()

io.on("connection", (socket) => {
    console.log("user connected")
      socket.on("join-room",({email,roomId})=>{
        emailToSocketmapping.set(email,socket.id)
        socketToEmailMapping.set(socket.id,email)
        socket.join(roomId)
        socket.emit("room-joined",{roomId})
        socket.broadcast.to(roomId).emit("user-joined",{email})
        console.log(email,"user joined the room ",roomId)
    })

    socket.on("call-user",({email,offer})=>{
      const userSocketId = emailToSocketmapping.get(email)
      const emailCalling = socketToEmailMapping.get(socket.id)
      socket.to(userSocketId).emit("incomming-call",{offer,from:emailCalling})

    })
    socket.on("call-accepted",({email,ans})=>{
      const userSocketId = emailToSocketmapping.get(email)
      socket.to(userSocketId).emit("call-accepted",{ans})
    })

});



io.listen(4000);
app.listen(3000,()=>console.log("server listening"))