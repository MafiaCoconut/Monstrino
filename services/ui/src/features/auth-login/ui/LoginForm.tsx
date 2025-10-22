// import { Box, TextField, InputAdornment, IconButton, Typography, FormControlLabel, Checkbox, Button, Link, Avatar } from "@mui/material";
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import React, { useState, useContext } from "react";
// import { Context } from "../../../main";

// const LoginForm = () => {
//     // const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isEmailValid, setIsEmailValid] = useState(false);
//     const [isPasswordValid, setIsPasswordValid] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const {userStore} = useContext(Context);

//     const handleSubmit = async () => {
//       if (isEmailValid && isPasswordValid) {
//         let result = await userStore.login(email, password);
//         if (result === true) {
//           console.log("Login success");
//         } else {
//           console.log("Login failed");
//         }
//       }
//     }
//     const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
//       if (validateEmail(event.target.value)){
//         setIsEmailValid(true);
//       } else {
//         setIsEmailValid(false);
//       }
//       setEmail(event.target.value);
//     }

//     const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//       if (validatePassword(event.target.value)) {
//         setIsPasswordValid(true);
//       } else {
//         setIsPasswordValid(false);
//       }
//       setPassword(event.target.value);
//     }
    
//     const validateEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     const validatePassword = (password: string) => {
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         return passwordRegex.test(password);
//     }
    
//     return (
//         <Box
//           maxWidth={360}
//           mx="auto" mt={8} px={3} py={4}
//           boxShadow={10} borderRadius={2}
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//         >
//           <Typography variant="subtitle1" mb={2}>
//             Login to your account
//           </Typography>
    
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             variant="outlined"
//             onChange={handleChangeEmail}
//             // TODO добавить вывод инфомрации о невалидном email
//             // { isEmailValid ? error : null}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <AccountCircle />
//                 </InputAdornment>
//               )
//             }}
//           />
    
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Password"
//             variant="outlined"
//             type={showPassword ? "text" : "password"}
//             onChange={handleChangePassword}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//           />
    
//           <Box
//             display="flex" justifyContent="space-between" alignItems="center"
//             width="100%" mt={1} mb={2}
//           >
//             <FormControlLabel control={<Checkbox />} label="Remember me" />
//             <Link href="#" variant="body2">
//               Forgot password?
//             </Link>
//           </Box>
    
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSubmit}
//             sx={{
//               backgroundColor: "#0F1D40",
//               color: "white",
//               textTransform: "none",
//               fontWeight: "bold",
//               py: 1.2, mb: 2,
//               "&:hover": {
//                 backgroundColor: "#0c1733"
//               }
//             }}
//           >
//             Log In
//           </Button>
    
//           <Typography variant="body2">
//             No Account?{" "}
//             <Link href="#" underline="hover">
//               Sign up
//             </Link>
//           </Typography>
//         </Box>
//       );
// };

// export default LoginForm;