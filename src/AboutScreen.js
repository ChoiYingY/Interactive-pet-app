import { Typography, Box, Grid } from "@mui/material";

const AboutScreen = () => {
    const style = {
        grid:{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        divider:{
            marginTop: "3vh"
        },
        
    }
    
    return(
        <Grid className="about">
            <Grid sx={style.grid}>
                <Box
                    component="img"
                    src="./Interactive-pet-app/assets/rilakkuma_intro.png"
                    sx = {style.divider}
                />
                <Grid sx={style.grid}>
                    <Typography variant="h1" sx = {style.divider}>Who am I?</Typography>

                    <ul id="list">
                        <li>Hi! My name is Rilakkuma, and my name means “Bear in relaxed mood” in Japanese.</li>
                        <li>I love to talk to people, so please talk to me whenever you feel bored!</li>
                    </ul>
                    
                    <Typography variant="p" sx = {style.divider}>Copyright to ©SAN-X CO., LTD. ALL RIGHTS RESERVED.</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AboutScreen;