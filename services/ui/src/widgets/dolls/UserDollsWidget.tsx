import { mockUserData } from "@/data/mocAppData"
import { DollCard } from "@/entities/doll"
import { Grid } from "@mui/material"

const dolls = mockUserData.dolls

export const UserDollsWidget = () => {
    return (
        <Grid container spacing={2} direction="row">
            {dolls.map((doll) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <DollCard
                        key={doll.id}
                        dollId={doll.id}
                        image={doll.image}
                        name={doll.name}
                        character={doll.character}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
