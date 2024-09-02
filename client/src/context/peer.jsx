import { createContext, useContext, useMemo } from "react";

const peerContext = createContext(null)

export const usePeer =()=>useContext(peerContext)

export const PeerContextProvider=({children})=>{
    const peer = useMemo(()=>new RTCPeerConnection(
        {
            iceServers:[
                 {
                urls: ["stun:stun.l.google.com:19302",
                    "stun:global.stun.twilo.com:3478",
                ]

            }
        ]
        }
    ),[])
const createOffer =async()=>{
    const offer = await peer.createOffer()
    await peer.setLocalDiscription(offer)
    return offer
}
    return(
        <peerContext.Provider value={peer}>
            {children}
        </peerContext.Provider>
    )
}