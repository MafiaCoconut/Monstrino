// import React, { useState } from 'react';
// import { X, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Box,
//   Stack,
//   Typography,
//   TextField,
//   InputAdornment,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Link,
// } from '@mui/material';
// import { alpha } from '@mui/material/styles';

// const AuthModal = ({ isOpen, onClose, mode }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     username: '',
//     agreeToTerms: false
//   });

//   const C = {
//     black: '#0a0a0a',
//     white: '#ffffff',
//     purple: '#8b5fbf',
//     pink: '#ff69b4',
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`${mode} attempt:`, formData);

//     setTimeout(() => {
//       alert(`${mode === 'login' ? 'Login' : 'Registration'} successful! Welcome to Monstrino!`);
//       onClose && onClose();
//       setFormData({
//         email: '',
//         password: '',
//         confirmPassword: '',
//         username: '',
//         agreeToTerms: false
//       });
//     }, 1000);
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       slotProps={{
//         backdrop: {
//           sx: {
//             backgroundColor: 'rgba(0,0,0,.8)',
//             backdropFilter: 'blur(4px)',
//           },
//         },
//       }}
//       PaperProps={{
//         sx: {
//           bgcolor: C.black,
//           color: C.white,
//           border: `1px solid ${alpha(C.purple, 0.3)}`,
//           borderRadius: 2,
//           maxHeight: '90vh',
//                 position: 'absolute',
//       top: `0px`,
//       left: `0px`,
//       margin: 0, // убрать автоцентрирование
//         },
//       }}
//     >
//       {/* Header */}
//       <DialogTitle
//         sx={{
//           borderBottom: `1px solid ${alpha(C.purple, 0.2)}`,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           gap: 2,
//           py: 2,
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
//             fontWeight: 800,
//             color: C.pink,
//             fontSize: { xs: '1.25rem', md: '1.5rem' },
//           }}
//         >
//           {mode === 'login' ? 'Welcome Back, Ghoul!' : 'Join the Pack!'}
//         </Typography>

//         <IconButton
//           onClick={onClose}
//           sx={{
//             color: alpha(C.white, 0.7),
//             '&:hover': { color: C.white },
//           }}
//         >
//           <X size={22} />
//         </IconButton>
//       </DialogTitle>

//       {/* Form */}
//       <DialogContent dividers sx={{ borderColor: alpha(C.purple, 0.2) }}>
//         <Box component="form" onSubmit={handleSubmit}>
//           <Stack spacing={3}>
//             {mode === 'register' && (
//               <Box>
//                 <Typography
//                   sx={{
//                     fontFamily: 'Fira Code, monospace',
//                     textTransform: 'uppercase',
//                     letterSpacing: '0.1em',
//                     fontSize: 12,
//                     mb: 1,
//                     color: C.white,
//                   }}
//                 >
//                   Monster Name
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   placeholder="Choose your monster name"
//                   required
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <User size={18} color={C.purple} />
//                       </InputAdornment>
//                     ),
//                     sx: {
//                       bgcolor: alpha(C.white, 0.1),
//                       borderRadius: 1,
//                       color: C.white,
//                       '& fieldset': { borderColor: alpha(C.purple, 0.3) },
//                       '&:hover fieldset': { borderColor: alpha(C.purple, 0.5) },
//                       '&.Mui-focused fieldset': { borderColor: C.pink },
//                       '::placeholder': { color: alpha(C.white, 0.6) },
//                     },
//                   }}
//                 />
//               </Box>
//             )}

//             <Box>
//               <Typography
//                 sx={{
//                   fontFamily: 'Fira Code, monospace',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.1em',
//                   fontSize: 12,
//                   mb: 1,
//                   color: C.white,
//                 }}
//               >
//                 Email
//               </Typography>
//               <TextField
//                 fullWidth
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="your@email.com"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Mail size={18} color={C.purple} />
//                     </InputAdornment>
//                   ),
//                   sx: {
//                     bgcolor: alpha(C.white, 0.1),
//                     borderRadius: 1,
//                     color: C.white,
//                     '& fieldset': { borderColor: alpha(C.purple, 0.3) },
//                     '&:hover fieldset': { borderColor: alpha(C.purple, 0.5) },
//                     '&.Mui-focused fieldset': { borderColor: C.pink },
//                     '::placeholder': { color: alpha(C.white, 0.6) },
//                   },
//                 }}
//               />
//             </Box>

//             <Box>
//               <Typography
//                 sx={{
//                   fontFamily: 'Fira Code, monospace',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.1em',
//                   fontSize: 12,
//                   mb: 1,
//                   color: C.white,
//                 }}
//               >
//                 Password
//               </Typography>
//               <TextField
//                 fullWidth
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Enter your password"
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock size={18} color={C.purple} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         edge="end"
//                         onClick={() => setShowPassword(!showPassword)}
//                         sx={{ color: C.purple, '&:hover': { color: C.pink } }}
//                       >
//                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                   sx: {
//                     bgcolor: alpha(C.white, 0.1),
//                     borderRadius: 1,
//                     color: C.white,
//                     '& fieldset': { borderColor: alpha(C.purple, 0.3) },
//                     '&:hover fieldset': { borderColor: alpha(C.purple, 0.5) },
//                     '&.Mui-focused fieldset': { borderColor: C.pink },
//                     '::placeholder': { color: alpha(C.white, 0.6) },
//                   },
//                 }}
//               />
//             </Box>

//             {mode === 'register' && (
//               <Box>
//                 <Typography
//                   sx={{
//                     fontFamily: 'Fira Code, monospace',
//                     textTransform: 'uppercase',
//                     letterSpacing: '0.1em',
//                     fontSize: 12,
//                     mb: 1,
//                     color: C.white,
//                   }}
//                 >
//                   Confirm Password
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   type={showPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="Confirm your password"
//                   required
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Lock size={18} color={C.purple} />
//                       </InputAdornment>
//                     ),
//                     sx: {
//                       bgcolor: alpha(C.white, 0.1),
//                       borderRadius: 1,
//                       color: C.white,
//                       '& fieldset': { borderColor: alpha(C.purple, 0.3) },
//                       '&:hover fieldset': { borderColor: alpha(C.purple, 0.5) },
//                       '&.Mui-focused fieldset': { borderColor: C.pink },
//                       '::placeholder': { color: alpha(C.white, 0.6) },
//                     },
//                   }}
//                 />
//               </Box>
//             )}

//             {mode === 'register' && (
//               <FormControlLabel
//                 required={true}
//                 control={
//                   <Checkbox
//                     name="agreeToTerms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleInputChange}
//                       // required
//                     sx={{
//                       color: alpha(C.purple, 0.6),
//                       '&.Mui-checked': { color: C.pink },
//                     }}
//                   />
//                 }
//                 label={
//                   <Typography sx={{ color: alpha(C.white, 0.8), fontSize: 14 }}>
//                     I agree to the{' '}
//                     <Link href="#terms" underline="hover" sx={{ color: C.pink }}>
//                       Terms of Service
//                     </Link>{' '}
//                     and{' '}
//                     <Link href="#privacy" underline="hover" sx={{ color: C.pink }}>
//                       Privacy Policy
//                     </Link>
//                   </Typography>
//                 }
//                 sx={{ alignItems: 'flex-start' }}
//               />
//             )}

//             <Button
//               type="submit"
//               fullWidth
//               sx={{
//                 mt: 1,
//                 borderRadius: 999,
//                 px: 3,
//                 py: 1.5,
//                 bgcolor: C.pink,
//                 color: '#0a0a0a',
//                 fontFamily: 'Fira Code, monospace',
//                 fontSize: 12,
//                 letterSpacing: '0.09em',
//                 textTransform: 'uppercase',
//                 transition: 'all .3s ease',
//                 '&:hover': {
//                   bgcolor: alpha(C.pink, 0.9),
//                   transform: 'scale(1.02)',
//                   boxShadow: `0 10px 24px ${alpha(C.pink, 0.25)}`,
//                 },
//               }}
//             >
//               {mode === 'login' ? 'Sign In' : 'Create Monster Profile'}
//             </Button>

//             <Typography
//               sx={{ textAlign: 'center', color: alpha(C.white, 0.6), fontSize: 14 }}
//             >
//               {mode === 'login' ? "Don't have an account?" : 'Already a monster?'}
//               <Button
//                 type="button"
//                 onClick={() => { /* Switch mode logic would go here */ }}
//                 sx={{
//                   ml: 1,
//                   p: 0,
//                   minWidth: 0,
//                   color: C.pink,
//                   textTransform: 'none',
//                   '&:hover': { textDecoration: 'underline' },
//                 }}
//               >
//                 {mode === 'login' ? 'Join now' : 'Sign in'}
//               </Button>
//             </Typography>
//           </Stack>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AuthModal;
