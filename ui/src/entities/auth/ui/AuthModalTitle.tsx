import { DialogTitle, IconButton, Typography, useTheme } from "@mui/material"
import { X } from "lucide-react";

type AuthModalTitleProps = {
    text: string;
    onClose: () => void;
}

export const AuthModalTitle = ({ text, onClose }: AuthModalTitleProps) => {
    const theme = useTheme();
    
    return (
      <DialogTitle
        sx={{
          borderBottom: 1,
          borderColor: theme.palette.monstrino.purple,   // Вместо alpha(C.purple, 0.2)
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          py: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
            fontWeight: 800,
            color: theme.palette.monstrino.pink,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          {text}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{ color: theme.palette.monstrino.white }}
        >
          <X size={22} />
        </IconButton>
      </DialogTitle>
    )
}