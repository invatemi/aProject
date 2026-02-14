import { FC } from "react";
import { IComppentsProps } from "../lib";
import style from "./CommentsCard.module.css";

interface CommentsCardComponentProps extends IComppentsProps {
  theme?: "light" | "dark";
}

const CommentsCard: FC<CommentsCardComponentProps> = ({ postId, id, name, email, body, theme = "light" }) => {
  const cardClass = theme === "dark" ? style.cardDark : style.cardLight;

  return (
    <div className={cardClass}>
      <div className={style.meta}>
        <span className={style.postId}>Пост #{postId}</span>
        <span className={style.id}>Комментарий #{id}</span>
      </div>
      <h3 className={style.name}>{name}</h3>
      <div className={style.email}>{email}</div>
      <p className={style.body}>{body}</p>
    </div>
  );
};

export default CommentsCard;