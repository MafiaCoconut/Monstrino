import { StatItem } from "@/shared/ui/profile"
import Avatar from "@mui/material/Avatar"

type UserDollsButtonProps = {
    value: string;
    onClick?: () => void;
}

export const UserDollsButton = ({value, onClick}: UserDollsButtonProps) => {
    //  TODO Добавить ссылку на dolls page 
    return (
        <StatItem value={value} label={"Dolls"} onClick={onClick}/>
    )
}