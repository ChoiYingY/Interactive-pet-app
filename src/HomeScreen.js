import React, { useState, useEffect, useContext } from "react";

import ChatBox from "./ChatBox";
import ModelViewer from "./ModelViewer";
import { GlobalStoreContext } from "./Store";

// import VoiceRecorder from "./VoiceRecorder";

import { Button, Box, Grid } from "@mui/material";

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [choice, setChoice] = useState(0);
    const choices = ["./assets/cube.gltf", "./assets/rook.glb", "./assets/wolfie.glb"];

    const btn_style = {
        default:{
            width: "12.5vw",
            margin: "2.5%",
            padding: "2.55%",
            backgroundColor: "#7DA6B6",
            color: "white",
            float: "left"
        },
        hover: {
            '&.MuiButton-root:hover':{
                backgroundColor: '#95C1D2'
            }
        }
    }

    function handleChangeModel(event){
        event.stopPropagation();

        const nextIndex = (choice + 1) % choices.length;
        setChoice(nextIndex);

        if(nextIndex === 0){
            window.location.reload();
        }
    }

    function handleRename(event){
        event.stopPropagation();
    }

    useEffect(()=> {
        store.selfIntroduction();
    }, [])

    return(
        <Grid className="homeScreen">
            <Grid className='home'>
                {/* <VoiceRecorder/> */}
                
                <Box className="pet">
                    <div className="status">
                        <Button
                            onClick={handleChangeModel}
                            sx={ [ btn_style.default, btn_style.hover, { marginTop: "5vh" } ] }
                        >
                            Change Model
                        </Button>
                        <Button
                            onClick={handleRename}
                            sx={ [ btn_style.default, btn_style.hover ] }
                        >
                            Rename your bear
                        </Button>
                    </div>

                    <Box height="64vh">
                        <ModelViewer scale="10" modelPath={choices[choice]} />
                    </Box>
                </Box>

                <ChatBox/>
            </Grid>
        </Grid>
    );
}

export default HomeScreen;