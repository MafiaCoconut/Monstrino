import { TextField, InputAdornment, IconButton, useTheme } from "@mui/material"
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
type AuthPasswordTextField = {
    data: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    error: boolean;
    helperText?: string;
    required?: boolean;
}

export const AuthPasswordTextField = ({ data, onChange, placeholder, name, error, helperText, required=false }: AuthPasswordTextField) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            name={name}
            value={data}
            error={error}
            helperText={helperText}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock size={18} color={theme.palette.monstrino.purple} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{ color: theme.palette.monstrino.purple, '&:hover': { color: theme.palette.monstrino.pink } }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
            
            // sx: {
            //     bgcolor: alpha(C.white, 0.1),
            //     borderRadius: 1,
            //     color: C.white,
            //     '& fieldset': { borderColor: alpha(C.purple, 0.3) },
            //     '&:hover fieldset': { borderColor: alpha(C.purple, 0.5) },
            //     '&.Mui-focused fieldset': { borderColor: C.pink },
            //     '::placeholder': { color: alpha(C.white, 0.6) },
            // }
            
        />
    )
}