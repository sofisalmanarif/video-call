import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../context/socket'
import { usePeer } from '../context/peer'

const Room = () => {
   const {roomId} =  useParams()
   const socket = useSocket()
   const { peer,createOffer} = usePeer()

   const handelNewUser =async(email)=>{
    console.log(email,"joined")
    const offer = await createOffer()
    socket.emit("call-user",{email,offer})

   }
   useEffect(() => {
   
        socket.on("user-joined",({email})=>handelNewUser(email))
   }, [socket])
   
  return (
    <div>Room,{roomId}</div>
  )
}

export default Room