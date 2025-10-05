import { TextField, InputAdornment } from "@mui/material"
type AuthTextFieldProps = {
    data: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    inputAdornment: React.ReactNode; 
    required?: boolean;
}

export const AuthTextField = ({ data, onChange, inputAdornment, placeholder, name, required=false }: AuthTextFieldProps) => {
    return (
        <TextField
            fullWidth
            type="text"
            name={name}
            value={data}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            slotProps={{
                input: {
                    startAdornment: inputAdornment
                }
            }}
            // InputProps={{
            // startAdornment: (
            //     <InputAdornment position="start">
            //     <User size={18} color={C.purple} />
            //     </InputAdornment>
            // ),
            // sx: {
            //     bgcolor: alpha(C.white, 0.1),
            //     borderRadius: 1,
            //     color: C.white,
            //     '& fieldset': { borderColor: alpha(C.purple, 0.3) },
            //     '&:hover fieldset': { borderColor: alpha(C.purple, 0.5) },
            //     '&.Mui-focused fieldset': { borderColor: C.pink },
            //     '::placeholder': { color: alpha(C.white, 0.6) },
            // },
            // }}
        />
    )
}