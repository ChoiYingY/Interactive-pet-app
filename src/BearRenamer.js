import React, { useState, useContext } from "react";

import { GlobalBotContext } from "./Bot";
import { GlobalStoreContext } from "./Store";

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

const BearRenamer = () => {
    const [name, setName] = useState("");

    let { store } = useContext(GlobalStoreContext);
    let { bot } = useContext(GlobalBotContext);

    const styles = {
        flexContainer:{
            display: "flex",
            justifyContent: "space-between"
        },
        title:{
            flexDirection: "row",
            color: "white"
        },
        field:{
            flexDirection: "column",
            marginTop: "5%",
            '& input': { padding: '10px' }
        },
        textfield:{
            backgroundColor: "white",
            width: "60vh",
            marginTop: "2.5%"
        }
    }

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

    function handleNameUpdate(event){
        event.stopPropagation();
        setName(event.target.value);
        console.log(name);
    }

    function submitName(){
        if(!name || name === "")
            return;
        
        if(store && bot){
            console.log(`submit ${name}`);
        
            bot.rename(name);
            store.addMessage(name, `YAY I am now renamed to ${name}! (●゜㉨ ゜●)`);
            
            console.log(store)
        }
        setName("");
    }

    function handleKeyPress(event){
        event.stopPropagation();
        
        if(event.code === 'Enter' && store)
            submitName();
    }

    function handleSubmitName(event){
        event.stopPropagation();
        submitName();
    }

    function handleClearName(event){
        event.stopPropagation();
        setName("");
    }

    function handleCloseWindow(event){
        event.stopPropagation();
        setName("");

        if(store)
            store.stopEnteringName();
    }

    return(
        <Modal sx={{style}} open={store.edit_name}>
            <div className="modal-box">
                <div id="modal-content">
                    <Grid sx={[styles.flexContainer, styles.title]}>
                        <Typography variant="h6">Rename your bear</Typography>
                        <Button
                            sx={[ btn_style.default, btn_style.hover ]}
                            onClick={handleCloseWindow}
                        >
                            X
                        </Button>
                    </Grid>
                    <Grid sx={[styles.flexContainer, styles.field]}>
                        <Typography>Enter Name</Typography>
                        <TextField
                            variant='filled'
                            placeholder="Edit name..."
                            
                            sx={styles.textfield}
                            inputProps={{style: {fontSize: 24}}}

                            value={name}
                            onChange={handleNameUpdate}
                            onKeyPress={handleKeyPress}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            sx={[ btn_style.default, btn_style.hover, btn_style.base, { marginLeft: 0, marginTop: "5%" } ]}
                            onClick={handleSubmitName}
                        >
                            Submit
                        </Button>
                        <Button
                            sx={[ btn_style.default, btn_style.hover, btn_style.base ]}
                            onClick={handleClearName}
                        >
                            Clear
                        </Button>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
}

export default BearRenamer;