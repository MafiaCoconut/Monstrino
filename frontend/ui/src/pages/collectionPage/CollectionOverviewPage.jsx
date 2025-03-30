import { Grid } from "@mui/material";
import UserHeader from "../../components/headers/UserHeader";
import ListOfPages from "../../components/layouts/ListOfPages";
import CommonHeader from "../../components/headers/commonHeader/CommonHeader";

const CollectionOverviewPage = () => {
    
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