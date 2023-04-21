import React, { useState, useContext } from "react";

import Message from "./Message";
import ChatHandler from './ChatHandler';
import { GlobalStoreContext } from './Store';

import { Grid } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

const style = {
    flexColumn: {
        height:"92vh",
        maxHeight:"92vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    }
}

const ChatBox = () => {
    const { store } = useContext(GlobalStoreContext);

    let messages= (store && store.messageList) ? (store.messageList.map((msg) => (
        <Message
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
        />
    ))) : "";

    return (
        <Grid id="chatbox" sx ={[ style.flexColumn, { width:"70vw", backgroundColor: "#cfdce1", justifyContent:"space-between" } ]}>            
            <Grid sx={[ style.flexColumn, {  width:"100%", justifyContent:"flex-start", overflowY: "scroll", overflowX: "hidden"  } ]}>
                {messages}
                {/* <EmojiPicker position="absolute" alignSelf="flex-end"/> */}
            </Grid>
            <ChatHandler/>
        </Grid>
    )
}

export default ChatBox;