import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const peerContext = createContext(null)

export const usePeer =()=>useContext(peerContext)

export const PeerContextProvider=({children})=>{
    const [remoteStream,setRemoteStream] = useState(null)
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
    const createOffer = useCallback(
        async () => {
            try {
                const offer = await peer.createOffer();
                await peer.setLocalDescription(offer); 
                return offer;
            } catch (error) {
                console.error("Error creating or setting local description:", error);
                throw error; 
            }
        },
      [peer],
    )
    

    const createAnswer = useCallback(
        async (offer) => {
            try {
                await peer.setRemoteDescription(new RTCSessionDescription(offer)); 
                const ans = await peer.createAnswer(offer);
                await peer.setLocalDescription(ans);
                return ans;
            } catch (error) {
                console.error("Error creating or answering local description:", error);
                throw error; 
            }
        },
      [peer],
    )
    

    const setRemoteAns =async (ans)=>{
        await peer.setRemoteDescription(new RTCSessionDescription(ans))
    }
    peer.onconnectionstatechange = () => {
        switch (peer.connectionState) {
            case 'connected':
                console.log("The connection has become fully connected");
                break;
            case 'disconnected':
            case 'failed':
                console.log("The connection has been closed");
                // Optionally, attempt to reconnect or clean up
                break;
            case 'closed':
                console.log("The connection has been closed cleanly");
                break;
            default:
                console.log("Connection state changed to:", peer.connectionState);
                break;
        }
    };

    const sendStream =(stream)=>{
        const tracks = stream.getTracks()
        for(let track of tracks){
            peer.addTrack(track,stream)
        }

    }
    const handlerTrackEvent =(e)=>{
        const streams = ev.streams
        setRemoteStream(streams[0])

    }
    useEffect(() => {
      peer.addEventListener("track",handlerTrackEvent)
    
      return () => {
        peer.removeEventListener('track',handlerTrackEvent)
      }
    }, [peer])
    
    return(
        <peerContext.Provider value={{peer ,createOffer,createAnswer,setRemoteAns,sendStream,remoteStream}}>
            {children}
        </peerContext.Provider>
    )
}