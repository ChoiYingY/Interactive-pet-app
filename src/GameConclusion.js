import React, { useState, useEffect, useContext } from "react";

import { GlobalStoreContext } from "./Store";
import { useHistory } from "react-router-dom";

import { Modal, Typography, Button, Grid } from "@mui/material";

const style = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,

    height: "100vh",
    width: "auto",
    background: "black",
    padding: "1rem",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.35s ease-in"
}

const GameConclusion = () => {
    let history = useHistory();
    let { store } = useContext(GlobalStoreContext);
    const [openWindow, setOpenWindow] = useState((store && store.finish_game > 0) ? true : false);


    useEffect(()=> {
        if(store){
            const finish_game = store.finish_game;
            console.log(`openWindow: ${finish_game}`);
            setOpenWindow((finish_game > -1) ? true : false);
        }
    }, [store.finish_game])

    const btn_style = {
        base:{
            height: "50px",
            width: "60vh",
            padding: "0 25px",
            margin: "1.75% 0%",
            fontSize: 15
        },
        default:{
            backgroundColor: 'var(--trinary-color)',
            height: "30px",
            color: "white",
            fontSize: 20
        },
        hover: {
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--trinary-dark)',
            }
        }
    }

    function clearGrid(){
        if(store)
            store.clearGrid();
    }
  
    function handleReplay(event){
        event.stopPropagation();

        clearGrid();
    }

    function handleGoHome(event){
        event.stopPropagation();

        clearGrid();
        history.push('/');
    }

    function handleCloseWindow(event){
        event.stopPropagation();
        setOpenWindow(false);
    }

    let GameConclusion = "";

    if(store && store.finish_game > -1){
        const winnerFlag = store.finish_game;
        let conclusion = "Game tie! Great game.";

        if(winnerFlag === 0)
           conclusion = "You lose. Try again next time.";
        else if(winnerFlag === 1)
           conclusion = "Congratulation for your win!";
        GameConclusion = <Typography variant="h3" sx={{marginTop: "3.5%"}}>{conclusion}</Typography>
    }

    return(
        <Modal sx={{style}} open={(store && (store.finish_game > -1) && openWindow)}>
            <div className="modal-box">
                
                <div id="modal-content">
                    <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button
                            sx={[ btn_style.default, btn_style.hover ]}
                            onClick={handleCloseWindow}
                        >
                            X
                        </Button>
                    </Grid>
                    
                    {GameConclusion}

                    <Grid>
                        <Button
                            sx={[ btn_style.default, btn_style.hover, btn_style.base, { marginLeft: 0, marginTop: "5%" } ]}
                            onClick={handleReplay}
                        >
                            Replay
                        </Button>
                        <Button
                            sx={[ btn_style.default, btn_style.hover, btn_style.base ]}
                            onClick={handleGoHome}
                        >
                            Back To Home
                        </Button>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
}

export default GameConclusion;