import { StatItem } from "@/shared/ui/profile"

type UserFriendsButtonProps = {
    value: string;
    onClick?: () => void;
}

export const UserFriendsButton = ({value, onClick}: UserFriendsButtonProps) => {
    //  TODO Добавить ссылку на collections page 
    return (
        <StatItem value={value} label={"Friends"} onClick={onClick}/>
    )
}