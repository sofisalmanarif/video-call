import { createContext, useMemo } from "react";

const peerContext = createContext(null)



export const peerContextProvider=({children})=>{
    const peer = useMemo(()=>RTCPeerConnection(
        {
            iceServers: {
                urls: ["stun:stun.l.google.com:19302",
                    "stun:global.stun.twilo.com:3478",
                ]

            }
        }
    ),[])

    return(
        <peerContext.Provider value={peer}>
            {children}
        </peerContext.Provider>
    )
}