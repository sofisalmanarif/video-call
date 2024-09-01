import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../context/socket'

const Room = () => {
   const {roomId} =  useParams()
   const socket = useSocket()
   useEffect(() => {
        socket.on("user-joined",({email})=>console.log(email,"joined room"))
   }, [socket])
   
  return (
    <div>Room,{roomId}</div>
  )
}

export default Room