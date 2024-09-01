import React, { useContext, useEffect, useState } from 'react'
import { socketContext, useSocket } from '../context/socket'
import {useNavigate} from "react-router-dom"

const Home = () => {
    const [email, setemail] = useState("")
    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate()
    const socket = useSocket()

    const submitHandler=()=>{
        console.log(email,roomId)
        socket.emit("join-room",{email,roomId})
    }

    useEffect(() => {
     socket.on("room-joined",({roomId})=>navigate(`/room/${roomId}`))
    }, [])
    
  return (
    <div className='h-screen w-full flex items-center justify-center '>
       <div className='flex gap-2 flex-col'>
       <input value={email} onChange={(e)=>setemail(e.target.value)} className='rounded-md px-3 py-3 outline-none border-2 border-zinc-300' type="text" placeholder='Enter name'/>
        <input value={roomId} onChange={(e)=>setRoomId(e.target.value)} className='rounded-md px-3 py-3 outline-none border-2 border-zinc-300' type="text"  placeholder='Enter Room id'/>
        <button onClick={submitHandler} className='text-white bg-blue-500 hover:bg-blue-700 font-semibold text-md rounded-md px-20 py-3'> Join</button>
       </div>
    </div>
  )
}

export default Home