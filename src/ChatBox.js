import React, { useState, useContext, useRef } from "react";

import Message from "./Message";
import { GlobalStoreContext } from './Store';

import { Grid, TextField, Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const ChatBox = () => {
    const { store } = useContext(GlobalStoreContext);

    const microphoneRef = useRef(null);
    const { transcript, resetTranscript } = useSpeechRecognition();

    const [msg, setMsg] = useState("");

    let messages= (store && store.messageList)? (store.messageList.map((msg) => (
        <Message
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
        />
    ))) : "";

    function handleMsgUpdate(event){
        event.stopPropagation();
        setMsg(event.target.value);
        console.log(msg);
    }

    function handleKeyPress(event){
        event.stopPropagation();
        
        if(event.code === 'Enter' && store){
            console.log(msg);
            store.addMessage('User', msg);
            setMsg("");
            store.addMessage('Rilakkuma', "No.");
            console.log(store.messageList);
        }
    }

    function handleRecording(event){
        event.stopPropagation();
        
        if(store){
            if(!SpeechRecognition.browserSupportsSpeechRecognition()) {
                store.addMessage('Warning', "Warning! The current Browser does not Support Speech Recognition.");
            }
            else{
                store.startRecording();
            }
        }
    }

    return (
        <Grid sx ={{ width:"70vw", height:"92vh", maxHeight:"92vh", backgroundColor: "#cfdce1", display:"flex", justifyContent:"space-between" , flexDirection:"column", alignItems:"center"}}>            
            <Grid sx={{width: "100%", height:"92vh", maxHeight:"92vh", display:"flex", justifyContent:"flex-start", overflowY: "scroll", overflowX: "hidden" , flexDirection:"column", alignItems:"center" }}>
                {messages}
            </Grid>


            <Grid sx={{ width: "98%",  display:"flex", justifyContent:"space-around", alignItems:"center", marginBottom:"0.5%" }}>
                <Avatar
                    sx={{ bgcolor: '#7DA6B6' }}
                    onClick={handleRecording}
                >
                    <MicIcon/>
                </Avatar>
                <TextField
                    margin="normal"
                    name="name"
                    placeholder="Send a message..."
                    value={msg}
                    onChange={handleMsgUpdate}
                    onKeyPress={handleKeyPress}
                    sx={{backgroundColor:"white", width: "92.5%"}}
                />
            </Grid>
        </Grid>
    )
}

export default ChatBox;