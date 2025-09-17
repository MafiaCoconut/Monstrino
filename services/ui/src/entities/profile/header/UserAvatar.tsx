import Avatar from "@mui/material/Avatar"

export const UserAvatar = (props: any) => {
    const {
        avatar = ""
    } = props

    const avatarDefault = "https://images.unsplash.com/photo-1494790108755-2616b9c8d8c1?w=100&h=100&fit=crop&crop=face"
    return (
        <Avatar
            src={avatar !== "" ? avatar : avatarDefault}
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'black'
            }}
        />
    )
}