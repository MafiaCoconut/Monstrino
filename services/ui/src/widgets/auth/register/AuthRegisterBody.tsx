import { AuthDataField } from "@/entities/auth/ui/AuthDataField"
import { Context } from "@/main";
import { Box, DialogContent, InputAdornment, Stack, useTheme } from "@mui/material"
import { Mail, User, Lock } from "lucide-react"
import { useContext, useState } from "react";
import { isValidEmail, isValidPassword, isValidUsername } from "../utils";
import { AuthPasswordTextField } from "@/shared/ui/auth";
import { AuthChooseLoginOrRegister, AuthPasswordField, AuthTermOfUseField } from "@/entities/auth";
import { RegisterButton } from "@/features/auth-register";


type AuthRegisterBodyProps = {
    onClose: () => void;
}
export const AuthRegisterBody = ({ onClose }: AuthRegisterBodyProps) => {
    const theme = useTheme();
    
    const { userStore } = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [formDataErrors, setFormDataErrors] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    

    const isConfirmPasswordMatchPassword = () => {
        return formData.password === formData.confirmPassword;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Registration attempt:`, formData);
        // TODO main register logic

        if (!isConfirmPasswordMatchPassword()) {
            setErrorInFormData('confirmPassword', true);
        }

        if (!formData.agreeToTerms) {
            setErrorInFormData('agreeToTerms', true);
        }

        const result = userStore.registration(formData.username, formData.email, formData.password);

        setTimeout(() => {
            alert('Registration successful! Welcome to Monstrino!');
            onClose && onClose();
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                username: '',
                agreeToTerms: false
            });
        }, 1000);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValueInFormData(name, type === 'checkbox' ? checked : value);
        switch (name) {
            case 'username': { 
                isValidUsername(value) && formDataErrors.username? setErrorInFormData(name, false) :  setErrorInFormData(name, true); 
                break;
            }
            case 'email': { 
                isValidEmail(value) && formDataErrors.email? setErrorInFormData(name, false) :  setErrorInFormData(name, true); 
                break;
            }
            case 'password': {
                isValidPassword(value) && formDataErrors.password? setErrorInFormData(name, false) :  setErrorInFormData(name, true); 
                break; }
            case 'confirmPassword': {
                isValidPassword(value) && formDataErrors.confirmPassword? setErrorInFormData(name, false) :  setErrorInFormData(name, true); 
                break; 
            }
        }
    };



    const setValueInFormData = (name: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const setErrorInFormData = (name: string, value: boolean) => {
        setFormDataErrors(prev => ({ ...prev, [name]: value }));
    }



    return (
        <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3} direction="column" sx={{ mt: 2 }}>
                    <AuthDataField 
                        titleText={'Username'} 
                        data={formData.username} 
                        onChange={handleInputChange} 
                        placeholder={'Enter your monster username'} 
                        name={'username'} 
                        inputAdornment={
                            <InputAdornment position="start">
                                <User size={18} color={theme.palette.monstrino.purple} />
                            </InputAdornment>
                        }
                        required={true}
                    />
                    <AuthDataField 
                        titleText={'Email'} 
                        data={formData.email} 
                        onChange={handleInputChange} 
                        placeholder={'Enter your email'} 
                        name={'email'} 
                        inputAdornment={
                            <InputAdornment position="start">
                                <Mail size={18} color={theme.palette.monstrino.purple} />
                            </InputAdornment>
                        }
                        required={true}
                    />
                    <AuthPasswordField
                        titleText={'Password'}
                        data={formData.password}
                        onChange={handleInputChange}
                        placeholder={'Enter your password'}
                        name={'password'}
                        required={true}                   
                    />
                    <AuthTermOfUseField agreeToTerms={formData.agreeToTerms} onChange={handleInputChange} />
                    <RegisterButton />
                    <AuthChooseLoginOrRegister mode="register" />
                </Stack>
            </Box>
        </DialogContent>
    )
}
