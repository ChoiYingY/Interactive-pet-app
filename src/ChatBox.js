import React, { useContext, useState } from "react";

import Message from "./Message";
import ChatHandler from './ChatHandler';
import { GlobalStoreContext } from './Store';

import { Grid, Avatar } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const style = {
    flexColumn: {
        height:"93vh",
        maxHeight:"93vh",
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
        overflowY: "auto",
        overflowX: "hidden",
        paddingBottom: "9vh",
    },
    avatar: {
        base: {
            bgcolor: 'var(--primary-color)',
            position:"absolute",
            bottom: "12vh",
            right: "2vw"
        },
        '&:hover': {
            bgcolor: 'var(--secondary-color)'
        }
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

    var scrollDownBtn = "";
    
    function handleScrollDown(event){
        event.stopPropagation();

        const element = document.getElementById("chatbox-content");
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    }

    const element = document.getElementById('chatbox-content');
    if (element && element.clientHeight < element.scrollHeight){
        scrollDownBtn = <Avatar
            sx={ [ style.avatar, style.avatar.base ] }
            onClick={handleScrollDown}
        >
            <ArrowDownwardIcon/>
        </Avatar>;
    }

    return (
        <Grid id="chatbox" sx ={[ style.flexColumn, style.chatbox ]}>            
            <Grid id="chatbox-content" sx={[ style.flexColumn, style.chatbox_content ]}>
                {messages}
            </Grid>
            {scrollDownBtn}
            <ChatHandler/>
        </Grid>
    )
}

export default ChatBox;