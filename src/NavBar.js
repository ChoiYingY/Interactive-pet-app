import { GlobalBotContext } from './Bot';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, AppBar, Toolbar, Button } from '@mui/material';

const NavBar = () => {
    const history = useHistory();
    const {bot} = useContext(GlobalBotContext);

    const btn_style = {
        default:{
            height: "64px",
            color: "white",
            paddingLeft: "10px",
            paddingRight: "10px"
        },
        hover: {
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--secondary-color)'
            }
        }
    }

    function startGame(event){
        event.stopPropagation();
        
        if(bot)
            bot.startGame()
    }

    return (
        <Grid>
            <AppBar>
                <Toolbar sx={{minHeight:"8vh", backgroundColor:"var(--trinary-color)"}}>
                    <Button sx={[ btn_style.default, btn_style.hover ]} onClick={()=>history.push("/")}>
                        Home
                    </Button>
                    <Button sx={[ btn_style.default, btn_style.hover ]} onClick={startGame}>
                        Game
                    </Button>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default NavBar;