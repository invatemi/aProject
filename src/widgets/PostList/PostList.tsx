import { FC } from "react";
import { PostCard } from "@/entities";
import { IPostCardProps } from "@/entities/post/lib";
import style from "./PostList.module.css"

interface IPostListProps {
  posts: IPostCardProps[];
}

const PostList : FC<IPostListProps> = ({posts}) => {
    return (
        <ul className={style.list}>
        {posts.map(post => (
            <li key={post.id} className={style.item}><PostCard {...post}/></li>
        ))}
        </ul>
    )
}

export default PostList