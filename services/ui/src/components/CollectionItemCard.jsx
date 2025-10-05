import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CollectionItemCard = (props) => {
    const {
        name = "",
        series = "",
        image = "",
    } = props
    return (
        <div>
            <Card sx={{ maxWidth: 300, margin: 'auto', marginBottom: 2, borderRadius: 2, position: 'relative'}}>
                {/* <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={series}
                    /> */}
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt="Corgi"
                />
                <Grid container sx={{ alignItems: 'stretch', justifyContent: "space-around"}}>
                    <Grid item size={10}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {series}
                            </Typography>
                
                        </CardContent>
                    </Grid>
                    <Grid item size={2}>
                        <IconButton aria-label="settings"
                            // sx={{ position: 'absolute', bottom: 8, right: 8 }}
                        >
                            <MoreVertIcon />
                        </IconButton>               
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
export default CollectionItemCard;