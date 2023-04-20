import React from "react";

import { Grid, Box, Typography, Avatar } from '@mui/material';
import AndroidIcon from '@mui/icons-material/Android';

const style = {
    main: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        width:"95%",
        marginBottom: "2%"
    },
    user: {
        justifyContent:"flex-end"
    },
    rilakkuma: {
        justifyContent:"flex-start"
    }
};

const Message = (props) => {
    var sender = props.sender;
    var message = props.message;

    console.log(sender);
    console.log(message);

    let msg = <Typography sx={{ backgroundColor:"white", borderRadius:"25px", padding:"2.5%", maxWidth:"70%"}}>
                {message}
            </Typography>

    let msg_display="";

    if(sender === 'user'){
        msg_display = (<Grid item sx={ [ style.main, style.user ] }>
            {msg}
            <Box sx={{ margin:"10px 30px 10px 20px"}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width:"50px", height:"50px"}}>
                    <AndroidIcon/>
                </Avatar>
            </Box>
        </Grid>)
    }
    else{
        msg_display = (<Grid item sx={ [ style.main, style.rilakkuma ] }>
            <Box
                component="img"
                src="./assests/rilakkuma_icon.png"
                sx={{ width:"auto", height:"50px", margin:"10px 20px 10px 0px"}}
            />
            {msg}
        </Grid>)
    }

    return (
        <Grid sx={{ width:"100%",  display:"flex", flexDirection:"column" }}>
            <Grid container sx={{ display:"flex", justifyContent:"space-between" , flexDirection:"column", alignItems:"center", borderRadius:"5%", marginTop: "2%", marginLeft: "2%", height:"fit-content"}}>
                {msg_display}
            </Grid>
        </Grid>
    )
}

export default Message;