import React, { useState, useContext, useEffect } from 'react';

import GlobalBotContext from "./Bot";
import GlobalStoreContext from './Store';

import { Grid, Button, Box } from '@mui/material';

const Square = (props) => {
    const squareValue = props.value;
    const index = props.index;

    const [userTurn, setUserTurn] = useState(false);
    const {bot} = useContext(GlobalBotContext);
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
        if(store && bot && store.gameGrid){
            let response = bot.calculateWinner(store.gameGrid);
            if(userTurn){
                console.log(store.gameGrid);
                console.log(response);
                if(response === null){
                    let botChoice = bot.selectSquare(store.gameGrid);
                    console.log("botChoice");
                    console.log(botChoice);
                    if(botChoice === -1){
                        store.concludeGame(2);
                    }
                    else{
                        store.chooseSquare(bot.name, botChoice);
                    }
                }
                else{
                    store.concludeGame(response);
                }
                setUserTurn(false);
            }
            else{
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

        if(store)
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
            src="./Interactive-pet-app/assets/user.png"
            sx = {{ width: "100%", height: "auto"}}
        />
    </Grid>
    }
    else if(squareValue === 0){
        console.log("Rilakkuma");
        squarePlaceHolder = <Grid sx={[style.square, style.square_icon, {backgroundColor: "#F6C604"}]}>
            <Box
                component="img"
                src="./Interactive-pet-app/assets/rilakkuma_head.png"
                sx = {{ width: "100%", height: "auto"}}
            />
        </Grid>
    }

    if(store === null){
        return <Grid>
            <Button
                sx={[ style.square, style.btn_effect ]}
                onClick={handleChosenSquare}
                disabled={squareValue !== null}
            >
                { squareValue }
            </Button>;
        </Grid>;
    }

    return (
        <Grid>
            {squarePlaceHolder}
        </Grid>
    )
}

export default Square