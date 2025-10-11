import { AuthTextField, AuthTitleTextField } from "@/shared/ui/auth"
import { Box, BoxProps } from "@mui/material";

type AuthDataFieldProps = {
    titleText: string;
    data: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    inputAdornment: React.ReactNode; 
    required?: boolean;
}

export const AuthDataField = ({ titleText, data, onChange, placeholder, name, inputAdornment, required=false, }: AuthDataFieldProps) => {
    return (
        <Box>
            <AuthTitleTextField text={titleText} required={required} sx={{ ml: 1 }} /> 
            <AuthTextField data={data} onChange={onChange} placeholder={placeholder} name={name} inputAdornment={inputAdornment} required={required} />
        </Box>
    )
}