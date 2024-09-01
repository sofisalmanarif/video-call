import {createContext, useContext, useMemo} from "react"
import {io} from "socket.io-client"

export const socketContext = createContext(null)

export const useSocket =()=>{
    return useContext(socketContext)
}

export const SocketContextProvider =({children})=>{
    const socket = useMemo(()=>(
        io("http://localhost:4000", )
    ),[])

    return(
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}