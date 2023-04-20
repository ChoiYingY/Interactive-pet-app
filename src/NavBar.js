import { Grid, AppBar, Toolbar, Typography } from '@mui/material'

const NavBar = () => {
    return (
        <Grid>
            <AppBar>
                {/* <Toolbar sx={{minHeight:"8vh", backgroundColor:"#ff9ab1"}}> */}
                <Toolbar sx={{minHeight:"8vh", backgroundColor:"#DF9898"}}>
                    <Typography>
                        Hi
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default NavBar;