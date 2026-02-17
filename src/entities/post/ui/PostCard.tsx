import { FC } from "react";
import { IPostCardProps } from "../lib";
import style from "./PostCard.module.css"

const PostCard : FC<IPostCardProps> = ({ userId, id, title, body }) => {
    return (
    <div className={style.card}>
        <h3>{title}</h3>
        <p>{body}</p>
        <small>Post ID: {id} | User ID: {userId}</small>
    </div>
    )
}

export default PostCard