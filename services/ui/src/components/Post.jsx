import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Collapse,
    Avatar,
    Box
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Comment from '@mui/icons-material/Comment';

const PostCard = (props) => {
    const {
        username = "",
        avatar = "",
        content = "",
    } = props

    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', marginBottom: 2, borderRadius: 2}}>
            <CardHeader
                avatar={<Avatar src={avatar} alt={username} />}
                title={username}
                // subheader={props.timestamp}
            />

            {/*/!* Медиа (например, изображение поста) *!/*/}
            {/*{props.image && (*/}
                {/* <CardMedia
                    component="img"
                    height="300"
                    // image={props.image}
                    alt="Изображение поста"
                /> */}
            {/*)}*/}

            {/*/!* Основной контент поста *!/*/}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>

            {/* Блок с интерактивными кнопками */}
            <CardActions disableSpacing>
                <IconButton onClick={handleLike} aria-label="лайк">
                    {liked ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton onClick={handleExpandClick} aria-label="комментарии">
                    <Comment />
                </IconButton>
            </CardActions>

            {/* Разворачиваемый блок с комментариями */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* Пример комментариев */}
                    <Typography paragraph><strong>Пользователь1:</strong> Отличный пост!</Typography>
                    <Typography paragraph><strong>Пользователь2:</strong> Согласен, очень интересно.</Typography>
                    {/* Здесь можно добавить форму для нового комментария */}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PostCard;
