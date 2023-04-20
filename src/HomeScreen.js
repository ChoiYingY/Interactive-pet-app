import React from "react";

import ChatBox from "./ChatBox";
import ModelViewer from "./ModelViewer";
import VoiceRecorder from "./VoiceRecorder";

import { Toolbar, Typography, Box, Grid } from "@mui/material";

const HomeScreen = () => {
    return(
        <Grid className="homeScreen">
            <Grid className='home'>
                <VoiceRecorder/>
                
                <Box className="pet">
                    <div className="status">
                        <Typography padding="5%">
                            hi
                        </Typography>
                    </div>

                    {/* <Box height="65vh">
                        <ModelViewer scale="10" modelPath={"./assests/cube.gltf"} />
                    </Box> */}
                </Box>

                <ChatBox/>
            </Grid>
        </Grid>
    );
}

export default HomeScreen;