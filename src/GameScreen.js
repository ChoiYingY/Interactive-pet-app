import React, { useContext, useEffect } from "react";

import Square from "./Square";
import GameConclusion from "./GameConclusion";

import { Grid, Typography } from "@mui/material";
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
        }
    }

    let arr = Array(9).fill(null);

    if(store && store.gameGrid){
        arr = store.gameGrid;
    }

    let gameGrid = arr.map((squareValue, index) => {
        return <Square key={index} index={index} value={squareValue}/>
    });

    useEffect(()=> {
        if(store){
            store.calculateWinner();
        }
    }, [store.gameGrid])

    return <Grid sx={ style.grid }>
        <GameConclusion/>
        <Typography variant="h1" sx={{marginTop: "1.5%"}}>Tic-Tac-Toe</Typography>
        <Grid sx={ style.gameGrid_row }>
            {gameGrid}
        </Grid>
    </Grid>
}

export default GameScreen;