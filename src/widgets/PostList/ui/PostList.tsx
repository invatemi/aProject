import { memo, useMemo } from "react";
import { PostCard } from "@/entities";
import { CommentList } from "@/widgets/CommentList";
import { IPostListProps } from "../lib";
import style from "./PostList.module.css";

const PostList = memo(({ theme, posts, onPostClick, selectedPostId, commentsByPostId }: IPostListProps) => {
  const listClass = theme === "dark" ? style.listDark : style.listLight;

  const renderedPosts = useMemo(() => 
    posts.map(post => {
      const isSelected = selectedPostId === post.id;
      const comments = commentsByPostId?.[post.id] || [];
      
      return (
        <li key={post.id} className={style.item}>
          <PostCard 
            {...post} 
            theme={theme}
            onClick={() => onPostClick?.(post.id)}
          />
          {isSelected && (
            <div className={style.commentsContainer}>
              {comments.length > 0 
                ? (<CommentList theme={theme} comments={comments as any} />)
                : (<p className={theme === "dark" ? style.noCommentsDark : style.noCommentsLight}>Комментариев пока нет</p>
              )}
            </div>)}
        </li>
      );
    }),[posts, theme, onPostClick, selectedPostId, commentsByPostId]);

  return <ul className={listClass}>{renderedPosts}</ul>;
});

export default PostList;