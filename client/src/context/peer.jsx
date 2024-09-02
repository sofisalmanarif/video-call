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
    const createOffer = async () => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer); 
            return offer;
        } catch (error) {
            console.error("Error creating or setting local description:", error);
            throw error; 
        }
    };
    
    return(
        <peerContext.Provider value={{peer ,createOffer}}>
            {children}
        </peerContext.Provider>
    )
}