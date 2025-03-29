import PostCard from "../components/Post";
import {AppBar, Button, Container, Paper, Toolbar, Typography, Grid, Box, Avatar, avatarClasses} from "@mui/material";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/Footer";
import UserHeader from "./userPage/UserHeader";
import UserPosts from "./userPage/UserPosts";

const PersonalPage = (props) => {
    const user = {
        username: "test username",
        avatar: "https://avatars1.githubusercontent.com/u/55?v=4",
        description: "test description",
        firstName: "firstName",
        lastName: "lastName",
        description: "description",
        posts: [
            {id: 1, content: "Post 1"},
            {id: 2, content: "Post 2"},
            {id: 3, content: "Post 3"},
            {id: 4, content: "Post 4"},
            {id: 5, content: "Post 5"},
        ],
    }
    return (
        <div>
            <Header/>
            <div style={{ marginTop: "0.6%"}}>
                <Grid container spacing={2} justifyContent="center" >
                    {/* Левый отступ */}
                    <Grid item xs={12} md={3} size="grow"/>

                    {/* Левая менюшка */}
                    <Grid item xs={12} md={3} size={2}>
                        <Paper sx={{p:2}}>
                            <Typography variant="h6">Меню пользователя</Typography>
                        </Paper>
                    </Grid>

                    {/* Основная часть */}
                    <Grid item size={8}>
                        <UserHeader firstName={user.firstName} lastName={user.lastName} description={user.description} username={user.username} avatarUrl={user.avatar}/>
                        <Grid container spacing={2} direction="row" sx={{marginTop: "1%"}}> 
                            <Grid item size={8}>
                                <UserPosts avatar={user.avatar} username={user.username} posts={user.posts}/>
                            </Grid>
                            <Grid item size={4}>
                                <Box sx={{width: "100%", height: "500px", bgcolor: "gray", borderRadius: 2}}>

                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Правый оступ */}
                    <Grid item xs={12} md={3} size="grow"/>
                </Grid>
            </div>
            <Footer/>
        </div>
    )
}

export default PersonalPage;