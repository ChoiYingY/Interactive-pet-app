import { GlobalStoreContext } from './Store';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, AppBar, Toolbar, Button } from '@mui/material';

const NavBar = () => {
    const {store} = useContext(GlobalStoreContext);
    const history = useHistory();

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

    return (
        <Grid>
            <AppBar>
                <Toolbar sx={{minHeight:"8vh", backgroundColor:"var(--trinary-color)"}}>
                    <Button sx={[ btn_style.default, btn_style.hover ]} onClick={()=>history.push("/")}>
                        Home
                    </Button>
                    <Button sx={[ btn_style.default, btn_style.hover ]} onClick={()=>store.startGame()}>
                        Game
                    </Button>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default NavBar;