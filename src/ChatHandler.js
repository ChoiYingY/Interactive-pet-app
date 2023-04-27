import React, { useContext, useState, useEffect } from "react";

import InputField from "./InputField";

import { GlobalBotContext } from './Bot';
import { GlobalStoreContext } from './Store';

import MicIcon from '@mui/icons-material/Mic';
import { Grid, Button, Avatar, Typography } from "@mui/material";

import { useSpeechContext } from '@speechly/react-client';

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
        bottom: "1.5%",
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
    },
    msgDisplayer:{
        display: "block",
        position: "absolute",
        padding: "10px",
        width: "60vw",
        minHeight: "10vh",
        bottom: "11vh",
        borderRadius: "5px",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    } 
}

const ChatHandler = () => {
    const { bot } = useContext(GlobalBotContext);
    const { store } = useContext(GlobalStoreContext);

    const [msg, setMsg] = useState("");
    const [pushMsg, setPushMsg] = useState(false);

    const { segment, listening, attachMicrophone, start, stop } = useSpeechContext();

    useEffect(() => {
        if(store){
            console.log("ChatHandler useEffect. Store.messageList now update to:");
            console.log(store.messageList);
            if(pushMsg){
                console.log("pushMsg");
                if(bot){
                    console.log("bot");
                    bot.respond(msg);
                }
                setPushMsg(false);
                setMsg("");
            }
        }
    }, [store && store.messageList]);

    const handleClick = async () => {
        if(listening){
            await stop();
            const transcript = segment.words.map((word) => word.value).join(' ');
            console.log(transcript)
            if(store)
                store.addMessage('User', transcript);
            setPushMsg(true);
            setMsg(transcript);
        }
        else{
            await attachMicrophone();
            await start();
        }
      };

    let msgPlaceHolder = (listening) ?
            <Button
                sx={ [ style.btn, style.btnHoverSx ] }
                onClick={handleClick}
            >
                Stop Recording
            </Button> :
            (<Grid sx={ style.inputGrid } >
                    <Avatar
                        sx={ [ style.avatar, style.avatar.base ] }
                        onClick={handleClick}
                    >
                        <MicIcon/>
                    </Avatar>
                    <InputField/>
                </Grid>
            );

    return (
        <Grid sx={ style.msgPlaceHolder }>
            {
                (listening && segment && segment.words) ?
                <Grid sx={ style.msgDisplayer }>
                    <Typography variant="h5">{(segment && segment.words) ? (segment.words.map((w) => w.value).join(" ")) : ""}</Typography>
                </Grid>
                : ""
            }
            {msgPlaceHolder}
        </Grid>
    )
}
export default ChatHandler;