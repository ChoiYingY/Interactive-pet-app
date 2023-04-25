import React from "react";

import { Grid, Box, Typography, Avatar } from '@mui/material';

import AndroidIcon from '@mui/icons-material/Android';
import WarningIcon from '@mui/icons-material/Warning';

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

const msg_style = {
    typography: {
        borderRadius:"25px",
        padding:"2.5%",
        maxWidth:"70%"
    },
    box: {
        margin:"10px 30px 10px 20px"
    },
    icon: {
        width:"50px",
        height:"50px"
    }
}

const flex_style = {
    flexColumn: {
        display:"flex",
        flexDirection:"column",
        width:"100%"
    },
    flexContainer: {
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:"5%",
        marginTop: "2%",
        marginLeft: "2%",
        height:"fit-content"
    }
}

const Message = (props) => {
    var sender = props.sender;
    var message = props.message;

    let msg_display="";
    
    let msg = <Typography sx={[ msg_style.typography, { backgroundColor:"white" } ]}>
                {message}
            </Typography>;

    let icon = <Box sx={[ msg_style.box, {bgcolor: 'var(--primary-color)'} ]}>
                    <Avatar sx={[ msg_style.icon, { bgcolor: 'var(--primary-color)' } ]}>
                        <AndroidIcon/>
                    </Avatar>
                </Box>

    if(sender === 'Warning'){
        msg = <Typography sx={[ msg_style.typography, { backgroundColor:"red", color: "white" } ]}>
                {message}
            </Typography>;

        icon = <Box sx={[ msg_style.box, { bgcolor: 'red' } ]}>
                    <Avatar sx={[ msg_style.icon, { bgcolor: 'red' } ]}>
                        <WarningIcon/>
                    </Avatar>
                </Box>
    }

    if(sender === 'User' || sender === 'Warning'){
        msg_display = (<Grid item sx={ [ style.main, style.user ] }>
            {msg}
            {icon}
        </Grid>)
    }
    else{
        msg_display = (<Grid item sx={ [ style.main, style.rilakkuma ] }>
            <Box
                component="img"
                src="./assets/rilakkuma_icon.png"
                sx={[ msg_style.icon, { margin:"10px 20px 10px 0px" } ] }
            />
            {msg}
        </Grid>)
    }

    return (
        <Grid sx={[ flex_style.flexColumn ]}>
            <Grid container sx={ [ flex_style.flexColumn, flex_style.flexContainer ]}>
                {msg_display}
            </Grid>
        </Grid>
    )
}

export default Message;