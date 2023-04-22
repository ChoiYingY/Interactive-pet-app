import React, { useState, useContext } from "react";

import { GlobalStoreContext } from './Store';

import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { TextField, InputAdornment } from "@mui/material";

import EmojiPicker from 'emoji-picker-react';

const InputField = () => {
    const { store } = useContext(GlobalStoreContext);
    const [msg, setMsg] = useState("");

    if(store)
        console.log(store.is_choosing_emoji)

    function handleMsgUpdate(event){
        event.stopPropagation();
        setMsg(event.target.value);
        console.log(msg);
    }

    function sendMsg(msg){
        if(!msg || msg === "")
            return;

        console.log(msg);
        store.addMessage('User', msg);
        store.respondMessage();
        
        setMsg("");
        
        console.log(store.messageList);
    }

    function handleKeyPress(event){
        event.stopPropagation();
        
        if(event.code === 'Enter' && store)
            sendMsg(msg);
    }

    function handleSendMsg(event){
        event.stopPropagation();
        
        if(store)
            sendMsg(msg);
    }

    function handleChooseEmoji(event){
        event.stopPropagation();

        if(store){
            store.startChoosingEmoji();
            console.log(store.is_choosing_emoji);
        }
    }

    function handleMouseOver(event){
        event.stopPropagation();
        console.log("handleMouseOver");

        if(store){
            if(!store.is_choosing_emoji){
                store.startChoosingEmoji();
            }
        }
    }

    function handleMouseOut(event){
        event.stopPropagation();
        console.log("handleMouseOut");

        if(store){
            if(store.is_choosing_emoji){
                store.stopChoosingEmoji();
            }
        }
    }
    
    return (
    <>
        <div
            id="EmojiPickerContainer"
            style={{ visibility: (store && store.is_choosing_emoji) ? 'visible' : 'hidden' }}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
        >
            <EmojiPicker/>
        </div>
        <TextField
                margin="normal"
                name="name"
                placeholder="Send a message..."

                value={msg}
                onChange={handleMsgUpdate}
                onKeyPress={handleKeyPress}

                sx={{ backgroundColor:"white", width: "92.5%", position:"absolute", left: "4.5vw" }}

                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" onClick={ handleChooseEmoji }>
                            <EmojiEmotionsIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end" onClick={ handleSendMsg }>
                            <SendIcon style={{ color: '#7DA6B6' }} />
                        </InputAdornment>
                    )
                }}
            />
    </>);
}

export default InputField;