// import { Box, TextField, InputAdornment, IconButton, Typography, FormControlLabel, Checkbox, Button, Link, Avatar } from "@mui/material";
// import ErrorOutline from '@mui/icons-material/ErrorOutline';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import React, { useContext, useState } from "react";
// import { Context } from "../../../main";
// import i18n from '../../../i18n';


// const RegisterForm = () => {
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
    
//     const [username, setUsername] = useState("");
//     const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
//     const [usernameHelperText, setUsernameHelperText] = useState("");

//     const [email, setEmail] = useState("");
//     const [isEmailInvalid, setIsEmailInvalid] = useState(false);
//     const [emailHelperText, setemailHelperText] = useState("");


//     const [password, setPassword] = useState("");
//     const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
//     const [passwordHelperText, setPasswordHelperText] = useState("");

//     const {userStore} = useContext(Context);

//     const USERNAME_REGEX = /^[A-Za-z0-9_-]{3,20}$/;
//     const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
//     const FIRST_NAME_REGEX = /^[A-Za-z ]+$/
//     const LAST_NAME_REGEX  = /^[A-Za-z ]+$/

//     const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*+\-:{}'])[A-Za-z\d_!@#$%^&*+\-:{}']{6,15}$/;

//     const labelsExtraInfo = {
//         "test": i18n.t(""),
//         "name": "Length: 3-20 Available characters: 0-9, a-z, A-Z, _ -",
//         "email": "It must be a valid email address",
//         "password": "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
//     }


//     const handleSubmit = async(e: any) => {
//         e.preventDefault(); 
//         console.log(username, email, password)
//         console.log(isUsernameInvalid, isEmailInvalid, isPasswordInvalid)
//         if (!isUsernameInvalid && !isEmailInvalid && !isPasswordInvalid) {
//             const response = await userStore.registration(username, email, password);
//             switch (response.status) {
//                 case 200: {
//                     console.log("Registration success");
//                     break;
//                 }
//                 case 409:{
//                     let conflictValue = response.data.result;
//                     switch (conflictValue) {
//                         case "username":
//                             setIsUsernameInvalid(true)
//                             break;
//                         case "email":
//                             setIsEmailInvalid(true)
//                             break;
//                     }
//                     break;
//                 }
//                 case 422: {
//                     let notValidValue = response.data.result;
//                     switch (notValidValue) {
//                         case "username":
//                             setIsUsernameInvalid(true)
//                             break;
//                         case "email":
//                             setIsEmailInvalid(true)
//                             break;
//                         case "password":
//                             setIsPasswordInvalid(true)
//                             break; 
//                     }
//                     break;
//                 }

//             }
//         }
//     }

//     const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setUsername(event.target.value);
//         if (!USERNAME_REGEX.test(event.target.value)) {
//             setIsUsernameInvalid(true);
//         } else {
//             setIsUsernameInvalid(false);
//         }
//     }

//     const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(event.target.value);
//         if (!EMAIL_REGEX.test(event.target.value)) {
//             setIsEmailInvalid(true);
//         } else {
//             setIsEmailInvalid(false);
//         }
//     }

//     const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(event.target.value);
//         if (!PASSWORD_REGEX.test(event.target.value)) {
//             setIsPasswordInvalid(true);
//         } else {
//             setIsPasswordInvalid(false);
//         }
//     }

//     return (
//     <Box
//         component="form"
//         onSubmit={handleSubmit}
//         maxWidth={360}
//         mx="auto" mt={8} px={3} py={4}
//         boxShadow={2}
//         borderRadius={2}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//     >
//         <Typography variant="subtitle1" mb={2}>
//             {i18n.t("registerPage.title")}
//         </Typography>

//         <TextField
//         fullWidth label={i18n.t("registerPage.username.label")} 
//         placeholder={i18n.t("registerPage.username.placeholder")} 
//         margin="normal"
//         value={username}
//         onChange={handleChangeUsername}
//         error={isUsernameInvalid}
//         helperText={labelsExtraInfo.name}
//         InputProps={{
//             endAdornment: isUsernameInvalid && (
//             <InputAdornment position="end">
//                 <ErrorOutline color="error" />
//             </InputAdornment>
//             ),
//         }}
//         />

//         <TextField
//         fullWidth label="Email" margin="normal"
//         value={email}
//         onChange={handleChangeEmail}
//         error={isEmailInvalid}
//         helperText={
//             <span>{emailHelperText}</span>}
//         InputProps={{
//             endAdornment: isEmailInvalid && (
//             <InputAdornment position="end">
//                 <ErrorOutline color="error" />
//             </InputAdornment>
//             ),
//         }}
//         />

//         <TextField
//         fullWidth label="Password" margin="normal"
//         type={showPassword ? 'text' : 'password'}
//         value={password}
//         onChange={handleChangePassword}
//         error={isPasswordInvalid}
//         helperText={labelsExtraInfo.password}
//         InputProps={{
//             endAdornment: (
//             <InputAdornment position="end">
//                 {isPasswordInvalid && <ErrorOutline color="error" />}
//                 <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//             </InputAdornment>
//             ),
//         }}
//         />

//         <Button
//         fullWidth
//         // type="submit"
//         variant="contained"
//         onClick={handleSubmit}
//         sx={{
//             mt: 3,
//             mb: 2,
//             backgroundColor: '#0F1D40',
//             color: 'white',
//             textTransform: 'none',
//             fontWeight: 'bold',
//             py: 1.2,
//             '&:hover': { backgroundColor: '#0c1733' },
//         }}
//         >
//         Sign Up
//         </Button>

//         <Typography variant="body2">
//         Have an account?{' '}
//         <Link href="/login" underline="hover">
//             Sign in
//         </Link>
//         </Typography>
//     </Box>
//   );
// }

// export default RegisterForm;