import React from "react";

import ModelViewer from "./ModelViewer";
import ChatBox from "./ChatBox";

import { Toolbar, AppBar, Typography, Box, TextField, Grid } from "@mui/material";

const HomeScreen = () => {
    return(
        <div className="homeScreen">
            <Box>
                <AppBar>
                    <Toolbar>
                        <Typography>
                            Hi
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className='home'>
                <Box className="pet">
                    <Box id="status">
                        <Typography>
                            Hi
                        </Typography>
                    </Box>

                    <Box>
                        <ModelViewer scale="10" modelPath={"./assests/cube.gltf"} />
                    </Box>
                </Box>

                <ChatBox/>
                
            </div>
        </div>
    );
}

export default HomeScreen;