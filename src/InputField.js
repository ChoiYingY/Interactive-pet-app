import React, { useState, useContext, useRef, useEffect } from "react";

import { GlobalStoreContext } from './Store';
import { GlobalBotContext } from './Bot';

import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { TextField, InputAdornment } from "@mui/material";

import EmojiPicker from 'emoji-picker-react';

const InputField = () => {
    const { bot } = useContext(GlobalBotContext);
    const { store } = useContext(GlobalStoreContext);
    const [msg, setMsg] = useState("");
    const [pushMsg, setPushMsg] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        console.log("store.messageList now update to:");
        if(pushMsg){
            if(bot){
                bot.respond(msg);
            }
            setPushMsg(false);
            setMsg("");
        }
    }, [store && store.messageList]);

    function handleMsgUpdate(event){
        event.stopPropagation();
        setMsg(event.target.value);
        console.log(msg);
    }

    function sendMsg(msg){
        if(!msg || msg === "")
            return;

        console.log(msg);

        if(store){
            store.addMessage('User', msg);
            console.log(store.messageList);
        }

        setPushMsg(true);
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
        if(inputRef){
            inputRef.current.focus();
        }
    }

    function handleMouseEnter(event){
        event.stopPropagation();
        console.log("handleMouseEnter");

        if(store){
            if(!store.is_choosing_emoji){
                store.startChoosingEmoji();
            }
        }
        if(inputRef){
            inputRef.current.focus();
        }
    }

    function handleMouseLeave(event){
        event.stopPropagation();
        console.log("handleMouseLeave");

        if(store){
            if(store.is_choosing_emoji){
                store.stopChoosingEmoji();
            }
        }
        if(inputRef){
            inputRef.current.focus();
        }
    }

    function handleEmojiClick(event){
        if(event && event.emoji){
            let insertedEmoji = msg.concat(event.emoji);
            setMsg(insertedEmoji);
        }
    }
    
    return (
    <>
        <div
            id="EmojiPickerContainer"
            style={{ visibility: (store && store.is_choosing_emoji) ? 'visible' : 'hidden' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <EmojiPicker onEmojiClick={handleEmojiClick}/>
        </div>
        <TextField
                margin="normal"
                name="name"
                placeholder="Send a message..."

                value={msg}
                onChange={handleMsgUpdate}
                onKeyPress={handleKeyPress}
                inputRef={inputRef}

                sx={{ backgroundColor:"white", width: "92.5%", position:"absolute", left: "4.5vw" }}

                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" onClick={ handleChooseEmoji }>
                            <EmojiEmotionsIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end" onClick={ handleSendMsg }>
                            <SendIcon style={{ color: 'var(--primary-color)' }} />
                        </InputAdornment>
                    )
                }}
            />
    </>);
}

export default InputField;