import { memo, useMemo } from "react";
import { PostCard } from "@/entities";
import { IPostListProps } from "../lib";
import style from "./PostList.module.css";

const PostList = memo(({ theme, posts, onPostClick }: IPostListProps) => {
  const listClass = theme === "dark" ? style.listDark : style.listLight;

  const renderedPosts = useMemo(() => 
    posts.map(post => (
      <li key={post.id} className={style.item}>
        <PostCard 
          {...post} 
          theme={theme}
          onClick={onPostClick}
        />
      </li>
    )),
    [posts, theme, onPostClick]
  );

  return <ul className={listClass}>{renderedPosts}</ul>;
});

export default PostList;