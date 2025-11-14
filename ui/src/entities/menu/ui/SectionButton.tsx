import { ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

type SectionButtonProps = {
    disabled: boolean,
    path: string,
    label: string,
    icon: LucideIcon,
    isActive?: boolean
}

export const SectionButton = ({disabled, path, label, icon: Icon, isActive}: SectionButtonProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ListItemButton
            disabled={disabled}
            onClick={() => navigate(path)}
            sx={{
            borderRadius: 1,
            mb: 0.5,
            bgcolor: isActive ? 'secondary.main' : 'transparent',
            color: isActive ? 'white' : 'primary.main',
            minHeight: { xs: 40, md: 48 },
            px: { xs: 1, md: 2 },
            '&:hover': {
                bgcolor: isActive ? 'secondary.main' : 'rgba(139, 95, 191, 0.2)',
                color: 'white',
            },
        }}
        >
            <ListItemIcon sx={{ color: 'inherit', minWidth: { xs: 32, md: 36 } }}>
                <Icon fontSize={isMobile ? "small" : "medium"} />
            </ListItemIcon>
            <ListItemText 
                primary={label}
                primaryTypographyProps={{
                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                    fontFamily: '"Fira Code", monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}
            />
    </ListItemButton>
    )
}