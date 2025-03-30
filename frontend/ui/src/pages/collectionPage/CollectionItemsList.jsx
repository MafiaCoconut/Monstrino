import { Box, Grid } from "@mui/material";
import CollectionItemCard from "../../components/CollectionItemCard";

const CollectionItemsList = (props) => {
    const {
        items = [],
    } = props;
    return (
        <Box>
            <Grid container spacing={2}>
                {items.map((item) => (
                    <CollectionItemCard name={item.name} series={item.series} image={item.image} />
                ))}
            </Grid>
        </Box>
    )
}
export default CollectionItemsList;