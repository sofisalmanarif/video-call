import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../context/socket'
import { usePeer } from '../context/peer'
import ReactPlayer from 'react-player'

const Room = () => {
   const {roomId} =  useParams()
   const socket = useSocket()
   const [myStream, setMyStream] = useState(null)
   
   const { peer,createOffer,createAnswer,setRemoteAns,sendStream,remoteStream} = usePeer()

   const handelNewUser =useCallback(
    async(email)=>{
      console.log(email,"joined")
      const offer = await createOffer()
      socket.emit("call-user",{email,offer})
  
     },
     [],
   )
   

   const handelIncomminCall=useCallback(
    async(from,offer)=>{
      console.log(from,offer)
      const ans = await createAnswer(offer)
      socket.emit("call-accepted",{email:from,ans})
     },
     [],
   )
   

   const handelCallAccepted =useCallback(
    async(ans)=>{
      console.log(ans)
      await setRemoteAns(ans)
     },
     [],
   )
   const getUserMediaStream =async()=>{
    const stream =await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    sendStream(stream)
    setMyStream(stream)
   }
useEffect(() => {
  getUserMediaStream()

 
}, [getUserMediaStream])

   useEffect(() => {
   
        socket.on("user-joined",({email})=>handelNewUser(email))
        socket.on("incomming-call",({from,offer})=>handelIncomminCall(from,offer))
        socket.on("call-accepted",({ans})=>handelCallAccepted(ans))

        return()=>{
          socket.off("user-joined",({email})=>handelNewUser(email))
          socket.off("incomming-call",({from,offer})=>handelIncomminCall(from,offer))
          socket.off("call-accepted",({ans})=>handelCallAccepted(ans))
        }
   }, [socket])
   
  return (
    <div>
      <div>
      <ReactPlayer url={myStream} playing={true} />
      <ReactPlayer url={remoteStream} playing={true} />
      
      </div>
    </div>
  )
}

export default Room