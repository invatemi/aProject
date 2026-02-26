import { memo } from "react";
import { CommentsCard } from "@/entities";
import { ItemList } from "@/shared/ui/ItemList";
import { ICommentListProps } from "../lib";

const CommentList = memo(({ theme, comments }: ICommentListProps) => {
  return (
    <ItemList
      items={comments}
      theme={theme}
      emptyMessage="К этому посту ещё нет комментариев"
      emptySubtext="Будьте первым, кто оставит комментарий!"
      renderItem={(comment) => <CommentsCard {...comment} />}
    />
  );
});

export default CommentList;