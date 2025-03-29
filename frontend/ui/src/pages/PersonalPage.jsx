import PostCard from "../components/Post";
import {AppBar, Button, Container, Paper, Toolbar, Typography, Grid} from "@mui/material";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/Footer";

const PersonalPage = (props) => {
    const user = {
        username: "test username",
        avatar: "https://avatars1.githubusercontent.com/u/55?v=4",
        description: "test description",
        
    }
    return (
        <div>
            <Header/>
            <div style={{ marginTop: "0.6%"}}>
                <Grid container spacing={2} justifyContent="center" >
                    <Grid item xs={12} md={3} size={2}/>
                    <Grid item xs={12} md={3} size={2}>
                        <Paper sx={{p:2}}>
                            <Typography variant="h6">Меню пользователя</Typography>
                            <Button>Friends</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} size={4}>
                        <PostCard username={user.username} avatar={user.avatar}/>
                    </Grid>
                    <Grid item xs={12} md={3} size={2}>
                        <Paper sx={{p:2}}>
                            <Typography variant="h6">Дополнительно</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} size={2}/>
                </Grid>
            </div>
            <Footer/>
        </div>
    )
}

export default PersonalPage;