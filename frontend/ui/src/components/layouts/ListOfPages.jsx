import { Box, Button, Grid } from "@mui/material";

const ListOfPages = () => {
    return (
        <div>
            <Box sx={{ width: "100%", height: "100%", bgcolor: "gray", borderRadius: 2 }}>
                <Grid container spacing={2} direction="column">
                    <Button varian="outlined">Profile</Button>
                    <Button varian="outlined">Lenta</Button>
                    <Button varian="outlined">Friends</Button>
                    <Button varian="outlined">Collection</Button>
                </Grid>
            </Box>
        </div>
    )
}
export default ListOfPages;