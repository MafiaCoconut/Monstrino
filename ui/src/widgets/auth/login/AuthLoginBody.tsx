import { AuthDataField } from "@/entities/auth/ui/AuthDataField"
import { Context } from "@/main";
import { Box, DialogContent, InputAdornment, Stack, useTheme } from "@mui/material"
import { Mail, User, Lock } from "lucide-react"
import { useContext, useEffect, useState } from "react";
import { isValidEmail, isValidPassword, isValidUsername } from "../utils";
import { AuthPasswordTextField } from "@/shared/ui/auth";
import { AuthChooseLoginOrRegister, AuthPasswordField, AuthSubmitButton, AuthTermOfUseField } from "@/entities/auth";
import { useNavigate } from "react-router-dom";

type AuthRegisterBodyProps = {
    onClose: () => void;
}

export const AuthLoginBody = ({ onClose }: AuthRegisterBodyProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { userStore } = useContext(Context);

    const [formData, setFormData] = useState({
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'TestPassword123',
        rememberMe: false,
    });

    const [formDataErrors, setFormDataErrors] = useState({
        username: false,
        email: false,
        password: false,
    });

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !formDataErrors.email && !formDataErrors.password && formData.email != '' && formData.password != '' ) {
            let success = await userStore.login(formData.email, formData.password);
            if (success) {
                navigate(`/users/${userStore.user.username}`);
            } else {
                alert("Invalid email or password. Please try again.");
            }
        } else {
            alert('Please provide valid credentials');
        }  
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValueInFormData(name, value);   


    }

    const setValueInFormData = (name: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const setErrorInFormData = (name: string, value: boolean) => {
        setFormDataErrors(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
    console.log("formData changed:", formData);
    }, [formData]);

    useEffect(() => {
        console.log("formDataErrors changed:", formDataErrors);
    }, [formDataErrors]);

    return (
        <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3} direction="column" sx={{ mt: 2 }}>
                    <AuthDataField
                        name="email"
                        titleText="Email"
                        data={formData.email}
                        onChange={handleInputChange}
                        error={formDataErrors.email}
                        placeholder="Must be a valid email address"
                        required={true}
                        inputAdornment={
                            <InputAdornment position="start">
                                <Mail size={18} color={theme.palette.monstrino.purple} />
                            </InputAdornment>
                        }
                    />
                    <AuthPasswordField
                        titleText={'Password'}
                        data={formData.password}
                        onChange={handleInputChange}
                        placeholder={'Enter your password'}
                        name={'password'}
                        error={formDataErrors.password}
                        helperText="Minimum 8 characters, must include one letter, one digit, and one special character"
                        required={true}                   
                    />
                    <AuthSubmitButton text="Login" onClick={handleSubmit}/>
                </Stack>
            </Box>
        </DialogContent>
    )
}