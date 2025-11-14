import { mockUserData } from "@/data/mocAppData"
import { AddDollButton, DollsPageTitle } from "@/entities/doll"
import { AddDollModal } from "@/widgets/dolls/AddDollModal"
import { UserDollsWidget } from "@/widgets/dolls"
import { UserHeader } from "@/widgets/headers"
import { Box, Grid, Stack } from "@mui/material"
import { useState } from "react"




export const UserDollsPage = () => {

    const [isAddDollModalOpen, setIsAddDollModalOpen] = useState(false);

    return (
        <>
        <Box sx={{ display: 'flex', bgcolor: 'background.default', justifyContent: 'center',}}>
            <Grid container direction="column" spacing={1} alignItems="center" width="100%">
                <Grid size={12}>
                    <UserHeader  
                        data-component="UserProfile"
                        data-section="UserHeader"
                        userData={mockUserData.currentUser}
                    />
                </Grid>
                <Grid size={12}>
                    <Box
                        component="main"
                        sx={{
                        py: { xs: 2, md: 3 },
                        width: '100%'
                        }}
                    >
                        <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                        spacing={2}
                        sx={{ mb: 3 }}
                        >
                        <DollsPageTitle text="My Dolls" />
                        <AddDollButton 
                            text="Add Doll"
                            onClick={() => setIsAddDollModalOpen(true)} 
                        />
                        </Stack>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <UserDollsWidget />
                </Grid>
                
            </Grid>
        </Box>

        <AddDollModal isOpen={isAddDollModalOpen} onClose={() => setIsAddDollModalOpen(false)} onSubmit={undefined} />
        </>
    )
}