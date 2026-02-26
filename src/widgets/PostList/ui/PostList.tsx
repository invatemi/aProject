import { memo } from "react";
import { PostCard } from "@/entities";
import { ItemList } from "@/shared/ui/ItemList";
import { IPostListProps } from "../lib";

const PostList = memo(({ theme, posts, onPostClick }: IPostListProps) => {
  return (
    <ItemList
      items={posts}
      theme={theme}
      renderItem={(post) => (
        <PostCard 
          {...post} 
          theme={theme}
          onClick={onPostClick}
        />
      )}
    />
  );
});

export default PostList;