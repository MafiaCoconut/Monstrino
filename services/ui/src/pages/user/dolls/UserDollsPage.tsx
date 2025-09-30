import { mockUserData } from "@/data/mocAppData"
import { UserDollsWidget } from "@/widgets/dolls"
import { UserHeader } from "@/widgets/headers"
import { Box, Grid } from "@mui/material"




export const UserDollsPage = () => {
    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', justifyContent: 'center',}}>
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid size={12}>
                    <UserHeader  
                        data-component="UserProfile"
                        data-section="UserHeader"
                        userData={mockUserData.currentUser}
                    />
                </Grid>

                <Grid size={12}>
                    <UserDollsWidget />
                </Grid>
                
            </Grid>
        </Box>
    )
}