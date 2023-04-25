import React, { useContext } from "react";

import Message from "./Message";
import ChatHandler from './ChatHandler';
import { GlobalStoreContext } from './Store';

import { Grid } from '@mui/material';

const style = {
    flexColumn: {
        height:"92vh",
        maxHeight:"92vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    chatbox: {
        width:"70vw",
        backgroundColor: "var(--background-color)",
        justifyContent:"space-between",
        position: "relative"
    },
    chatbox_content:{
        width:"100%",
        justifyContent:"flex-start",
        overflowY: "scroll",
        overflowX: "hidden",
        paddingBottom: "9vh",
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
        <Grid id="chatbox" sx ={[ style.flexColumn, style.chatbox ]}>            
            <Grid sx={[ style.flexColumn, style.chatbox_content ]}>
                {messages}
            </Grid>
            <ChatHandler/>
        </Grid>
    )
}

export default ChatBox;