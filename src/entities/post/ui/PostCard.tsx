import { FC } from "react";
import { IPostCardProps } from "../lib";
import { Button } from "@/shared";
import style from "./PostCard.module.css";

interface PostCardComponentProps extends IPostCardProps {
  theme?: "light" | "dark";
  onClick?: (postId: number) => void;
}

const PostCard: FC<PostCardComponentProps> = ({ 
  userId, 
  id, 
  title, 
  body, 
  theme = "light", 
  onClick 
}) => {
  const cardClass = `${style.card} ${theme === "dark" ? style["card--dark"] : ""}`;
  const handleClick = () => onClick?.(id);

  return (
    <div className={cardClass}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.text}>{body}</p>
      <div className={style.meta}>
        <small>Post ID: {id} | User ID: {userId}</small>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleClick}
        className={style.button}
      >
        Показать комментарии
      </Button>
    </div>
  );
};

export default PostCard;