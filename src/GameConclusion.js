import React, { useState, useEffect, useContext } from "react";

import { GlobalStoreContext } from "./Store";
import { useHistory } from "react-router-dom";

import { Modal, Typography, TextField, Button, Grid } from "@mui/material";

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
    let { store } = useContext(GlobalStoreContext);
    let history = useHistory();
    // const [gameFinished, setGameFinished] = useState((store) ? store.finish_game : -1);


    // useEffect(()=> {
    //     if(store){
    //         const finish_game = store.finish_game;
    //         console.log(`gameFinished: ${finish_game}`);
    //         setGameFinished(finish_game);
    //     }
    // }, [store.finish_game])

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
  
    function handleReplay(event){
        event.stopPropagation();
        store.clearGrid();
    }

    function handleGoHome(event){
        event.stopPropagation();
        store.clearGrid();
        history.push('/');
    }

    // function handleClearName(event){
    //     event.stopPropagation();
    //     setName("");
    // }

    // function handleCloseWindow(event){
    //     event.stopPropagation();
    //     setName("");
    //     store.stopEnteringName();
    // }

    let GameConclusion = "";

    if(store && store.finish_game > -1){
        const winnerFlag = store.finish_game;
        let conclusion = "Tie";

        if(winnerFlag === 0)
           conclusion = "You lose.";
        else if(winnerFlag === 1)
           conclusion = "You Win!";
        GameConclusion = <Typography variant="h1">{conclusion}</Typography>
    }


    return(
        <Modal sx={{style}} open={(store && store.finish_game > -1)}>
            <div className="modal-box">
                
                <div id="modal-content">
                    {GameConclusion}
                    <Grid>
                        <Button
                            sx={[ btn_style.default, btn_style.hover, btn_style.base, { marginLeft: 0, marginTop: "10%" } ]}
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