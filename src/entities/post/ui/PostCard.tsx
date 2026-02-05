import { FC } from "react";
import { IPostCardProps } from "../lib";
import style from "./PostCard.module.css";

interface PostCardComponentProps extends IPostCardProps {
  theme?: "light" | "dark";
}

const PostCard: FC<PostCardComponentProps> = ({ userId, id, title, body, theme = "light"
}) => {
  const cardClass = `${style.card} ${theme === "dark" ? style["card--dark"] : ""}`;

  return (
    <div className={cardClass}>
      <h3>{title}</h3>
      <p>{body}</p>
      <small>Post ID: {id} | User ID: {userId}</small>
    </div>
  );
};

export default PostCard;