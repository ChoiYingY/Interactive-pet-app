import React from "react";

import { Grid, Box, Typography } from '@mui/material';

const Message = () => {
    return (
        <Grid sx={{width: "100%",  display:"flex", flexDirection:"column" }}>
            <Grid container sx={{ display:"flex", justifyContent:"space-between" , flexDirection:"column", alignItems:"center", backgroundColor: "lightgray", width:"75%", borderRadius:"5%", marginTop: "2%", marginLeft: "2%", height:"fit-content"}}>
                <Grid item sx={{ display:"flex", justifyContent:"flex-start" , flexDirection:"row", alignItems:"center", width:"95%", marginBottom: "2%"}}>
                    <Box
                        component="img"
                        alt="Playlister_logo"
                        src="./assests/rilakkuma_icon.png"
                        sx={{ width:"auto", height:"50px", margin:"10px"}}
                    />
                    <Typography
                        sx={{ backgroundColor:"red", borderRadius:"25px", padding:"2.5%"}}
                    >
                        component="img"
                        alt="Playlister_logo"
                        src="./assests/rilakkuma_icon.png"
                        component="img"
                        alt="Playlister_logo"
                        src="./assests/rilakkuma_icon.png"
                        component="img"
                        alt="Playlister_logo"
                        src="./assests/rilakkuma_icon.png"
                        component="img"
                        alt="Playlister_logo"
                        src="./assests/rilakkuma_icon.png"
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Message;