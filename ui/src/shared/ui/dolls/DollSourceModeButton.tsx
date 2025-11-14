import { Button } from "@mui/material"

type DollsSourceModeButtonProps<T> = {
    mode: T;
    setMode: (mode: T) => void;
    text: string;
    variant: 'contained' | 'outlined';
}

export const DollsSourceModeButton = <T extends string>({ mode, setMode, text, variant }: DollsSourceModeButtonProps<T>) => {
    return (
        <Button 
            sx={{
                borderRadius: 2,
                fontSize: '0.75rem',
                width: '50%'
            }}
            size="small"
            variant={variant}
            onClick={() => setMode(mode)}
        >
          {text}
        </Button>
    )
}