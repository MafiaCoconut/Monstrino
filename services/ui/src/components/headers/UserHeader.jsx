import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import PostCard from "../Post";

const UserHeader = (props) => {
    const {
        firstName = "",
        lastName = "",
        username = "",
        avatarUrl = "",
        description = "",

    } = props
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: 200, borderRadius: 4, bgcolor: "gray" }}>
            <Box sx={{ flexGrow: 1, width: "100%", borderRadius: 1, bgcolor: "green", height: "70%" }}>
            </Box>
            <Box sx={{ width: "100%", height: "40%", borderRadius: 4, bgcolor: "purple" }}>
                <Grid container direction="row" sx={{ position: 'relative' }}>
                    <Grid item size={2}>
                        <Avatar src={avatarUrl}
                            sx={{ width: 100, height: 100, top: '-50px', left: '10px', position: 'absolute', }}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <Grid container spacing={2} direction="column">
                            <Grid item size={6}>
                                <Typography sx={{ fontSize: '5' }}>{firstName} {lastName}</Typography>
                            </Grid>
                            <Grid item size={4}>
                                <Typography sx={{ fontSize: '2' }}>{description}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item size="auto">
                        <Button variant="contained" sx={{ marginTop: "5%" }} >
                            Edit profile
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
export default UserHeader;