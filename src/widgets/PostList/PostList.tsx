import { FC } from "react";
import { PostCard } from "@/entities";
import { IPostCardProps } from "@/entities/post/lib";
import style from "./PostList.module.css";

interface IPostListProps {
    theme: "light" | "dark";
    posts: IPostCardProps[];
}

const PostList: FC<IPostListProps> = ({ theme, posts }) => {
    const listClass = `${style.list} ${theme === "dark" ? style["list--dark"] : ""}`;

    return (
        <ul className={listClass}>
            {posts.map(post => (
                <li key={post.id} className={style.item}>
                    <PostCard {...post} theme={theme} />
                </li>
            ))}
        </ul>
    );
};

export default PostList;