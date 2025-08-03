import { Box } from "@mui/material"
import PostCard from "../../../components/Post"

const UserPosts = (props) => {
    const {
        username = "",
        avatar = "",
        posts = [{}],
    } = props

    return (
        <Box>
            {posts.map((post) => (
                <PostCard avatar={avatar} username={username} content={post.content} />
            ))}
        </Box>
    )
}

export default UserPosts