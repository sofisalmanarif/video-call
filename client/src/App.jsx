import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { SocketContextProvider } from './context/socket'
import Room from './pages/Room'

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
 <SocketContextProvider>

 
 <BrowserRouter>
 <Routes>

  <Route path="/" element={<Home/>}  />
  <Route path="/room/:roomId" element={<Room/>}/>
 </Routes>
 
 </BrowserRouter>
 </SocketContextProvider>
 </>
  )
}

export default App
