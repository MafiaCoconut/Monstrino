import { Grid } from "@mui/material";
import UserHeader from "../../../components/headers/UserHeader";
import ListOfPages from "../../../components/ListOfPages";
import CommonHeader from "../../../components/headers/commonHeader/CommonHeader";
import CollectionItemsList from "./CollectionItemsList";

const CollectionOverviewPage = () => {
    const items = [
        { id: 1, name: "Item 1", series: "Series 1", image: `${process.env.PUBLIC_URL}/defaultImages/avatar.png` },
        { id: 2, name: "Item 2", series: "Series 2", image: `${process.env.PUBLIC_URL}/defaultImages/avatar.png` },
        { id: 3, name: "Item 3", series: "Series 3", image: `${process.env.PUBLIC_URL}/defaultImages/avatar.png` },
        { id: 4, name: "Item 4", series: "Series 4", image: `${process.env.PUBLIC_URL}/defaultImages/avatar.png` },
        { id: 5, name: "Item 5", series: "Series 5", image: `${process.env.PUBLIC_URL}/defaultImages/avatar.png` },
    ]
    console.log(items[0].image)
    return (
        <div>
            <CommonHeader />
            <div style={{ marginTop: "0.6%" }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item size="grow" />
                    <Grid item size={2}>
                        <ListOfPages />
                    </Grid>
                    <Grid item size={8}>
                        <Grid container spacing={2}>
                            <Grid item size={12}>
                                <UserHeader />
                            </Grid>
                            {/* Меню с предметами коллекции */}
                            <Grid item size={10}>
                                <CollectionItemsList items={items} />
                            </Grid>
                            {/* Правое меню */}
                            <Grid item size={4}>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item size="grow" />
                </Grid>
            </div>
        </div>
    );
}
export default CollectionOverviewPage;