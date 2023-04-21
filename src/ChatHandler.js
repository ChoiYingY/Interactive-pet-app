import React, { useState, useContext } from "react";

import { GlobalStoreContext } from './Store';

import { Grid, Button, Avatar, TextField } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const style = {
    flexColumn: {
        height:"92vh",
        maxHeight:"92vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    btn: {
        backgroundColor: '#7DA6B6',
        color:"white",
        width: "100%",
        height: "56px",
        padding: "16.5px 14px",
        margin: "1.5% 1% 1% 1%"
    },
    btnHoverSx: {
        '&.MuiButton-root:hover':{
            backgroundColor: '#95C1D2'
        }
    },
    msgPlaceHolder: {
        width: "98%",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        marginBottom:"0.5%"
    }
}

const SpeechRecognizer = () => {
    const { store } = useContext(GlobalStoreContext);

    const [msg, setMsg] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    const { transcript, resetTranscript } = useSpeechRecognition(
        {onResult: (result) => {
            console.log(result)
        }}
    );

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

    function handleStopRecording(event){
        event.stopPropagation();

        setIsRecording(false);
        SpeechRecognition.stopListening();

        console.log(transcript);
    }

    function handleStartRecording(event){
        event.stopPropagation();
        
        if(store){
            if(!SpeechRecognition.browserSupportsSpeechRecognition()) {
                store.addMessage('Warning', "Warning! The current Browser does not Support Speech Recognition.");
                store.addMessage('Warning', "If your browser is Firefox, you may want to visit about:config & turn on the following flags: 1) media.webspeech.recognition.enable & 2) media.webspeech.recognition.force_enable");
            }
            else{
                console.log("recording");
                setIsRecording(true);
                
                SpeechRecognition.startListening({
                    continuous: true,
                    language: "en-US"
                });
            }
        }
    }

    let msgPlaceHolder = (isRecording) ?
            <Button
                onClick={handleStopRecording}
                sx={ [ style.btn, style.btnHoverSx ] }
            >
                Stop Recording
            </Button>
        : (<>
                <Avatar
                    sx={{ bgcolor: '#7DA6B6' }}
                    onClick={handleStartRecording}
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
                    sx={{ backgroundColor:"white", width: "92.5%" }}
                />
            </>
        );

    return (
        <Grid sx={ style.msgPlaceHolder }>
            {msgPlaceHolder}
        </Grid>
    )
}
export default SpeechRecognizer;