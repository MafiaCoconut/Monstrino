import { AuthDataField } from "@/entities/auth/ui/AuthDataField"
import { Context } from "@/main";
import { Box, DialogContent, InputAdornment, Stack, useTheme } from "@mui/material"
import { Mail, User, Lock } from "lucide-react"
import { useContext, useEffect, useState } from "react";
import { isValidEmail, isValidPassword, isValidUsername } from "../utils";
import { AuthPasswordTextField } from "@/shared/ui/auth";
import { AuthChooseLoginOrRegister, AuthPasswordField, AuthSubmitButton, AuthTermOfUseField } from "@/entities/auth";
import { RegisterButton } from "@/features/auth-register";
import { useNavigate } from "react-router-dom";


type AuthRegisterBodyProps = {
    onClose: () => void;
}
export const AuthRegisterBody = ({ onClose }: AuthRegisterBodyProps) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { userStore } = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);

    // const [formData, setFormData] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     agreeToTerms: false
    // });

    const [formData, setFormData] = useState({
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'TestPassword123',
        confirmPassword: 'TestPassword123',
        agreeToTerms: true
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Registration attempt:`, formData);

        if ( !formDataErrors.username && !formDataErrors.email && !formDataErrors.password ) {
            let result = await userStore.registration(formData.username, formData.email, formData.password);
            console.log("User store: ")
            console.log(userStore.getAllData())
            if (result.success) {
                navigate(`/user/${userStore.user.id}`);
            } else {
                switch (result.typeOfError) {
                    case "user-exists":
                        alert("User with this email or username already exists. Please try again with another email or username.");
                        break;
                    case "internal-server-error":
                        alert("Something went wrong. Please try again later.");
                        break;
                }
            }
             

        //     setTimeout(() => {
        //     alert('Registration successful! Welcome to Monstrino!');
        //     onClose && onClose();
        //     setFormData({
        //         email: '',
        //         password: '',
        //         confirmPassword: '',
        //         username: '',
        //         agreeToTerms: false
        //     });
        // }, 1000);
        }
        else {
            alert('Please fix the errors in the form before submitting.');
        }


    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValueInFormData(name, type === 'checkbox' ? checked : value);
        switch (name) {
            case 'username': { 
                if (!isValidUsername(value)) {
                    setErrorInFormData(name, true);
                } else if (formDataErrors.username === true){
                    setErrorInFormData(name, false);
                }
                break;
            }
            case 'email': { 
                if (!isValidEmail(value)) {
                    setErrorInFormData(name, true);
                } else if (formDataErrors.email === true){
                    setErrorInFormData(name, false);
                }
                break;
            }
            case 'password': {
                if (!isValidPassword(value)) {
                    setErrorInFormData(name, true);
                } else if (formDataErrors.password === true){
                    setErrorInFormData(name, false);
                }
                break; 
            }
            // case 'confirmPassword': {
            //     isValidPassword(value) && formDataErrors.confirmPassword? setErrorInFormData(name, false) :  setErrorInFormData(name, true); 
            //     break; 
            // }
        }
    };

    const onErrorRegister = () => {

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
                        name='username'
                        titleText='Username'
                        data={formData.username} 
                        onChange={handleInputChange} 
                        placeholder={'Enter your monster username'} 
                        error={formDataErrors.username}

                        inputAdornment={
                            <InputAdornment position="start">
                                <User size={18} color={theme.palette.monstrino.purple} />
                            </InputAdornment>
                        }
                        helperText="Allowed: letters (A-Z), digits (0-9), and underscores. Length: 3-20 characters."
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
                        error={formDataErrors.email}
                        helperText="Must be a valid email address"
                        required={true}
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
                    <AuthTermOfUseField agreeToTerms={formData.agreeToTerms} onChange={handleInputChange} />
                    <AuthSubmitButton text="Create Account" disabled={!formData.agreeToTerms} onClick={handleSubmit}/>
                    <AuthChooseLoginOrRegister mode="register" />
                </Stack>
            </Box>
        </DialogContent>
    )
}
