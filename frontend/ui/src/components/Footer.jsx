import {Box, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 1,
                mt: 'auto',
                backgroundColor: 'grey.200',
                textAlign: 'center'
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} My Website. Все права защищены.
            </Typography>
        </Box>    )
}
export default Footer