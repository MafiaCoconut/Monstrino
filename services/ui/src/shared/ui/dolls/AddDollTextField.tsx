import { TextField, TextFieldProps } from "@mui/material"

type AddDollTextFieldProps = TextFieldProps & {
    name: string;
    label: string;
    value: string | number;
    onChange: (e: any) => void;
    placeholder: string;

}

export const AddDollTextField = ({ name, label, value, onChange, placeholder, sx, ...rest }: AddDollTextFieldProps) => {
    return (
        <TextField
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            required
            sx={{ mb: 3 }}
            InputLabelProps={{
                sx: { 
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                ...sx,
                }
            }}
            placeholder={placeholder}
            {...rest}
        />
    )
}