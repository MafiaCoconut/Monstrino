import { Checkbox, FormControlLabel, Link, Typography, useTheme } from "@mui/material"

type AuthTermOfUseFieldProps = {
    agreeToTerms: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthTermOfUseField = ({ agreeToTerms, onChange }: AuthTermOfUseFieldProps) => {
    const theme = useTheme();
    
    return (
        <FormControlLabel
            control={
                <Checkbox
                name="agreeToTerms"
                checked={agreeToTerms}
                onChange={onChange}
                sx={{
                    color: theme.palette.monstrino.purple,
                    '&.Mui-checked': { color: theme.palette.monstrino.pink },
                }}
                />
            }
            label={
                <Typography sx={{ color: theme.palette.monstrino.white, fontSize: 14 }}>
                    I agree to the{' '}
                    <Link href="#terms" underline="hover" sx={{ color: theme.palette.monstrino.pink }}>
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#privacy" underline="hover" sx={{ color: theme.palette.monstrino.pink }}>
                        Privacy Policy
                    </Link>
                    {" "}*
                </Typography>
            }
        />
    )
}