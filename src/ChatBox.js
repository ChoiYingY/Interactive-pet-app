import React from "react";

import Message from "./Message";

import { Grid, TextField } from '@mui/material';


const ChatBox = () => {
    return (
        <Grid sx ={{ width:"100%", height:"410px", backgroundColor: "purple", display:"flex", justifyContent:"space-between" , flexDirection:"column", alignItems:"center"}}>
            <Grid sx={{width: "100%",  display:"flex", justifyContent:"flex-start",  overflowY: "scroll" , flexDirection:"column", alignItems:"center" }}>
                <Message/>
                <Message/>
                <Message/>
            </Grid>

            <Grid sx={{width: "100%",  display:"flex", justifyContent:"flex-start" , flexDirection:"column", alignItems:"center" }}>
                <TextField
                    margin="normal"
                    name="name"
                    placeholder="Send a message..."
                    sx={{backgroundColor:"white", width: "95%"}}
                />
            </Grid>
        </Grid>
    )
}

export default ChatBox;