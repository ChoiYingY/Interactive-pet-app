import { Grid, AppBar, Toolbar, Typography } from '@mui/material'

const NavBar = () => {
    return (
        <Grid>
            <AppBar>
                <Toolbar sx={{minHeight:"8vh"}}>
                    <Typography>
                        Hi
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default NavBar;