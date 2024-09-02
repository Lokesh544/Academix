import userInterface from "@/interfaces/userInterface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar({
  user,
  fallbackClassName,
  ImageClassName,
}: {
  user: userInterface;
  fallbackClassName?: string;
  ImageClassName?: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={user.img} className={ImageClassName} />
      <AvatarFallback className={fallbackClassName}>
        {user.name
          .split(" ")
          .splice(0, 2)
          .map((ele) => ele[0])
          .join("")
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
