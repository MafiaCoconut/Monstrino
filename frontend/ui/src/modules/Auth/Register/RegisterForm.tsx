import { Box, TextField, InputAdornment, IconButton, Typography, FormControlLabel, Checkbox, Button, Link, Avatar } from "@mui/material";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useContext, useState } from "react";
import { Context } from "../../../main";


const RegisterForm = () => {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const {userStore} = useContext(Context);
    const labelsExtraInfo = {
        "name": "Available characters: 0-9, a-z, A-Z, _ -",
        "email": "It must be a valid email address",
        "password": "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    }


    const handleSubmit = (e: any) => {
        e.preventDefault(); 
        console.log(username, email, password)
        console.log(isUsernameInvalid, isEmailInvalid, isPasswordInvalid)
        if (!isUsernameInvalid && !isEmailInvalid && !isPasswordInvalid) {
            userStore.registration(username, email, password);
        }
    }

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
    <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth={360}
        mx="auto" mt={8} px={3} py={4}
        boxShadow={2}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
    >
        <Typography variant="subtitle1" mb={2}>
            Create your Account
        </Typography>

        <TextField
        fullWidth label="Name" margin="normal"
        value={username}
        onChange={handleChangeUsername}
        error={isUsernameInvalid}
        helperText={labelsExtraInfo.name}
        InputProps={{
            endAdornment: isUsernameInvalid && (
            <InputAdornment position="end">
                <ErrorOutline color="error" />
            </InputAdornment>
            ),
        }}
        />

        <TextField
        fullWidth label="Email" margin="normal"
        value={email}
        onChange={handleChangeEmail}
        error={isEmailInvalid}
        helperText={labelsExtraInfo.email}
        InputProps={{
            endAdornment: isEmailInvalid && (
            <InputAdornment position="end">
                <ErrorOutline color="error" />
            </InputAdornment>
            ),
        }}
        />

        <TextField
        fullWidth label="Password" margin="normal"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handleChangePassword}
        error={isPasswordInvalid}
        helperText={labelsExtraInfo.password}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                {isPasswordInvalid && <ErrorOutline color="error" />}
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            ),
        }}
        />

        <Button
        fullWidth
        // type="submit"
        variant="contained"
        onClick={handleSubmit}
        sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#0F1D40',
            color: 'white',
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.2,
            '&:hover': { backgroundColor: '#0c1733' },
        }}
        >
        Sign Up
        </Button>

        <Typography variant="body2">
        Have an account?{' '}
        <Link href="/login" underline="hover">
            Sign in
        </Link>
        </Typography>
    </Box>
  );
}

export default RegisterForm;