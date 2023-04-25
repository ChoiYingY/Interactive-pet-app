import React, { useContext } from "react";

import Square from "./Square";
import GameConclusion from "./GameConclusion";

import { Grid, Typography, Button } from "@mui/material";
import GlobalStoreContext from "./Store";

const GameScreen = () => {
    const {store} = useContext(GlobalStoreContext);

    const style = {
        grid: {
            width: "100vw",
            height: "92vh",
            
            position: "fixed",
            paddingTop: "1vh",
            bottom: "0",
            left: "0",
        
            backgroundColor: "var(--background-color)",
        
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
        },
        gameGrid_row: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "150px",
            gap: "2.5vh",
            width: "490px",
            marginBottom: "2.5%"
        },
        title: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "80vw",
            marginTop: "1.5vh"
        }
    }

    const btn_style = {
        base:{
            height: "60px",
            width: "13vw",
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
        if(store){
            store.clearGrid();
        }
    }

    let arr = Array(9).fill(null);

    if(store && store.gameGrid){
        arr = store.gameGrid;
    }

    let gameGrid = arr.map((squareValue, index) => {
        return <Square key={index} index={index} value={squareValue}/>
    });

    let title = "Tic-Tac-Toe";
    let replayBtn = "";

    if(store && store.finish_game > -1){
        if(store.finish_game === 0){
            title = "You lose! 😔"
        }
        else if(store.finish_game === 1){
            title = "You win! 🥳"
        }
        else{
            title = "Tie! 🥸"
        }
        replayBtn = <Button
                        sx={[ btn_style.default, btn_style.hover, btn_style.base ]}
                        onClick={handleReplay}
                    >
                        Replay
                    </Button>
    }

    return <Grid sx={ style.grid }>
        <GameConclusion/>
        <Grid sx={ style.title }>
            <Typography variant="h1" sx={{marginTop: "1.5%"}}>{title}</Typography>
            {replayBtn}
        </Grid>
        <Grid sx={ style.gameGrid_row }>
            {gameGrid}
        </Grid>
    </Grid>
}

export default GameScreen;