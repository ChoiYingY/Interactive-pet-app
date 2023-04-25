import React, { useState, useContext } from "react";

import InputField from "./InputField";
import { GlobalStoreContext } from './Store';

import MicIcon from '@mui/icons-material/Mic';
import { Grid, Button, Avatar } from "@mui/material";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const style = {
    flexColumn: {
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    avatar: {
        base: {
            bgcolor: 'var(--primary-color)',
            position:"absolute"
        },
        '&:hover': {
            bgcolor: 'var(--secondary-color)'
        }
    },
    btn: {
        backgroundColor: 'var(--primary-color)',
        color:"white",
        width: "100%",
        height: "56px",
        padding: "16.5px 14px",
        margin: "1.5% 1% 1% 1%"
    },
    btnHoverSx: {
        '&.MuiButton-root:hover':{
            backgroundColor: 'var(--secondary-color)'
        }
    },
    msgPlaceHolder: {
        width: "95%",
        height: "10vh",
        position: "absolute",
        bottom: "0",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        paddingBottom:"1vh",
        backgroundColor: '#cfdce1',
    },
    inputGrid: {
        width: "70vw",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
    }
}

const SpeechRecognizer = () => {
    const { store } = useContext(GlobalStoreContext);

    const [isRecording, setIsRecording] = useState(false);

    const { transcript, resetTranscript } = useSpeechRecognition(
        {onResult: (result) => {
            console.log(result)
        }}
    );

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
                store.addMessage('Warning', "Warning! The current Browser does not Support Speech Recognition. If your browser is Firefox, you may want to visit about:config & turn on the following flags: 1) media.webspeech.recognition.enable & 2) media.webspeech.recognition.force_enable");
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
        : (<Grid sx={ style.inputGrid } >
                <Avatar
                    sx={ [ style.avatar, style.avatar.base ] }
                    onClick={handleStartRecording}
                >
                    <MicIcon/>
                </Avatar>
                <InputField/>
            </Grid>
        );

    return (
        <Grid sx={ style.msgPlaceHolder }>
            {msgPlaceHolder}
        </Grid>
    )
}
export default SpeechRecognizer;