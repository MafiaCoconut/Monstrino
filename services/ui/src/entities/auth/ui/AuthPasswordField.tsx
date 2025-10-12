import { AuthPasswordTextField, AuthTextField, AuthTitleTextField } from "@/shared/ui/auth"
import { Box } from "@mui/material";

type AuthPasswordFieldProps = {
    titleText: string;
    data: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    error: boolean;
    helperText?: string;
    required?: boolean;

}

export const AuthPasswordField = ({ titleText, data, onChange, placeholder, name, error, helperText, required=false, }: AuthPasswordFieldProps) => {
    return (
        <Box>
            <AuthTitleTextField text={titleText} required={required} sx={{ ml: 1 }} /> 
            <AuthPasswordTextField data={data} onChange={onChange} placeholder={placeholder} name={name} error={error} helperText={helperText} required={required} />
        </Box>
    )
}