import React, { useState, useEffect, useContext } from "react";

import ChatBox from "./ChatBox";
import BearRenamer from "./BearRenamer";
import ModelViewer from "./ModelViewer";

import { GlobalBotContext } from "./Bot";
import { GlobalStoreContext } from "./Store";

import { Button, Box, Grid } from "@mui/material";

const HomeScreen = () => {
    const { bot } = useContext(GlobalBotContext);
    const { store } = useContext(GlobalStoreContext);

    const [choice, setChoice] = useState(0);
    const [prompt, setPrompt] = useState("Start changing clothes");

    const choices = ["./assets/rilakkuma_base.gltf", "./assets/blueT_rilakkuma.gltf", "./assets/purpleT_rilakkuma.gltf", "./assets/yellowT_rilakkuma.gltf"];

    const btn_style = {
        default:{
            width: "12.5vw",
            margin: "2.5%",
            padding: "2.55%",
            backgroundColor: "var(--primary-color)",
            color: "white",
            float: "left"
        },
        hover: {
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--secondary-color)'
            }
        }
    }

    function handleChangeModel(event){
        event.stopPropagation();

        const nextIndex = (choice + 1) % choices.length;
        setChoice(nextIndex);

        if(nextIndex > 0){
            setPrompt(`style${nextIndex}`);
        }

        if(nextIndex === 0){
            window.location.reload();
        }
    }

    function handleRename(event){
        event.stopPropagation();
        console.log("now rename the bear");

        if(store)
            store.startEnteringName();
    }

    useEffect(()=> {
        if(bot)
            bot.selfIntroduction();
    }, [])

    return(
        <Grid className="homeScreen">
            <Grid className='home'>
                <BearRenamer/>
                
                <Box className="pet">
                    <div className="status">
                        <Button
                            onClick={handleChangeModel}
                            sx={ [ btn_style.default, btn_style.hover, { marginTop: "5vh" } ] }
                        >
                            {prompt}
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