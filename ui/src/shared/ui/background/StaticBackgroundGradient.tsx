import Box from "@mui/material/Box"

export const StaticBackgroundGradient = () => {
    return (
        <Box
            sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
                radial-gradient(circle at 20% 20%, rgba(139, 95, 191, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255, 217, 61, 0.08) 0%, transparent 70%),
                linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 100%)
            `,
            zIndex: -1,
            }}
        />
    )
}
