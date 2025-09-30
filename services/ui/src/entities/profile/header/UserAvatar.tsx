import Avatar from "@mui/material/Avatar"

export const UserAvatar = (props: any) => {
    const {
        avatar = ""
    } = props

    const avatarDefault = ""
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