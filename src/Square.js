import React, { useContext } from 'react';

import GlobalStoreContext from './Store';

import { Grid, Button, Box } from '@mui/material';

const Square = (props) => {
    const squareValue = props.value;
    const index = props.index;

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
        btn_hover: {
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--secondary-color)'
            }
        }
    }

    function handleChosenSquare(event){
        event.stopPropagation();

        console.log(index);
        store.chooseSquare('User', index);
    }

    let squarePlaceHolder = <Button
        sx={[ style.square, style.btn_hover ]}
        onClick={handleChosenSquare}
        disabled={squareValue !== null}
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