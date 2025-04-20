import { Box, TextField, InputAdornment, IconButton, Typography, FormControlLabel, Checkbox, Button, Link, Avatar } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = (e: any) => {
        if (showPassword) {
        setShowPassword(false);
        } else {
        setShowPassword(true);
        }
    };

    return (
        <Box
          maxWidth={360}
          mx="auto" mt={8} px={3} py={4}
          boxShadow={10} borderRadius={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="subtitle1" mb={2}>
            Login to your account
          </Typography>
    
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
    
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
    
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mt={1}
            mb={2}
          >
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
    
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0F1D40",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              py: 1.2,
              mb: 2,
              "&:hover": {
                backgroundColor: "#0c1733"
              }
            }}
          >
            Log In
          </Button>
    
          <Typography variant="body2">
            No Account?{" "}
            <Link href="#" underline="hover">
              Sign up
            </Link>
          </Typography>
        </Box>
      );
};

export default Login;