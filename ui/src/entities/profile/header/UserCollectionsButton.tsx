import { StatItem } from "@/shared/ui/profile"
import Avatar from "@mui/material/Avatar"

type UserCollectionsButtonProps = {
    value: string;
    onClick?: () => void;
}

export const UserCollectionsButton = ({value, onClick}: UserCollectionsButtonProps) => {
    //  TODO Добавить ссылку на collections page 
    return (
        <StatItem value={value} label={"Collections"} onClick={onClick}/>
    )
}