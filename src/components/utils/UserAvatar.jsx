import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
/**
 *
 * @param {{user: {img: string | URL, name: string}, ImageClassName?: string | object, fallbackClassName?: string | object}} props
 * @returns
 */
export default function UserAvatar({
  user,
  fallbackClassName,
  ImageClassName,
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
