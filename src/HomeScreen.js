import React from "react";

import NavBar from "./NavBar";
import ModelViewer from "./ModelViewer";
import ChatBox from "./ChatBox";

import { Toolbar, Typography, Box, Grid } from "@mui/material";

const HomeScreen = () => {
    return(
        <Grid className="homeScreen">
            <NavBar/>
            <Toolbar/>

            <Grid className='home'>
                <Box className="pet">
                    <div className="status">
                        <Typography padding="5%">
                            hi
                        </Typography>
                    </div>

                    <Box height="65vh">
                        <ModelViewer scale="10" modelPath={"./assests/cube.gltf"} />
                    </Box>
                </Box>

                <ChatBox/>
            </Grid>
        </Grid>
    );
}

export default HomeScreen;