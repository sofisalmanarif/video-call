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

    const createAnswer = async (offer) => {
        try {
            await peer.setRemoteDescription(new RTCSessionDescription(offer)); 
            const ans = await peer.createAnswer(offer);
            await peer.setLocalDescription(ans);
            return ans;
        } catch (error) {
            console.error("Error creating or answering local description:", error);
            throw error; 
        }
    };

    const setRemoteAns = (ans)=>{
        return peer.setRemoteDescription(new RTCSessionDescription(ans))
    }
    
    return(
        <peerContext.Provider value={{peer ,createOffer,createAnswer,setRemoteAns}}>
            {children}
        </peerContext.Provider>
    )
}