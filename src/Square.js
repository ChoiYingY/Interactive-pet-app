import React, { useState, useContext, useEffect } from 'react';

// import GameBot from "./GameBot";
import * as GameBot from './GameBot.js'

import GlobalStoreContext from './Store';

import { Grid, Button, Box } from '@mui/material';

const Square = (props) => {
    const squareValue = props.value;
    const index = props.index;

    const [userTurn, setUserTurn] = useState(false);
    const {store} = useContext(GlobalStoreContext);

    const style = {
        square:{
            height: "150px",
            width: "150px",
            backgroundColor: "var(--primary-color)",
            color: "white",
            borderRadius: "4px"
        },
        square_icon: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        btn_effect: {
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--secondary-color)'
            },
            '&.MuiButton-root:disabled':{
                backgroundColor: 'gray'
            }
        }
    }

    useEffect(()=> {
        if(store && store.gameGrid){
            if(userTurn){
                let response = GameBot.calculateWinner(store.gameGrid);
                console.log(store.gameGrid);
                console.log(response);
                if(response === null){
                    let botChoice = GameBot.selectSquare(store.gameGrid);
                    console.log("botChoice");
                    console.log(botChoice);
                    if(botChoice === -1){
                        store.concludeGame(2);
                    }
                    else{
                        store.chooseSquare(store.name, botChoice);
                    }
                }
                else{
                    store.concludeGame(response);
                }
                setUserTurn(false);
            }
            else{
                let response = GameBot.calculateWinner(store.gameGrid);
                if(response !== null){
                    store.concludeGame(response);
                }
            }
        }
    }, [store && store.gameGrid])

    function handleChosenSquare(event){
        event.stopPropagation();

        console.log(index);
        setUserTurn(true);
        store.chooseSquare('User', index);
    }

    let squarePlaceHolder = <Button
        sx={[ style.square, style.btn_effect ]}
        onClick={handleChosenSquare}
        disabled={squareValue !== null || (store && (store.finish_game > -1))}
    >
        { squareValue }
    </Button>;

    if(squareValue === 1){
        console.log("User");
        squarePlaceHolder = <Grid sx={[style.square, style.square_icon, {backgroundColor: "#84B945"}]}>
        <Box
            component="img"
            src="./assets/user.png"
            sx = {{ width: "100%", height: "auto"}}
        />
    </Grid>
    }
    else if(squareValue === 0){
        console.log("Rilakkuma");
        squarePlaceHolder = <Grid sx={[style.square, style.square_icon, {backgroundColor: "#F6C604"}]}>
            <Box
                component="img"
                src="./assets/rilakkuma_head.png"
                sx = {{ width: "100%", height: "auto"}}
            />
        </Grid>
    }

    return (
        <Grid>
            {squarePlaceHolder}
        </Grid>
    )
}

export default Square