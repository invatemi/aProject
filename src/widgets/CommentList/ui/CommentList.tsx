import { memo, useMemo } from "react";
import { CommentsCard } from "@/entities";
import { ICommentListProps } from "../lib";
import style from "./CommentList.module.css"

const CommentList = memo(({ theme, comments } : ICommentListProps) => {

    const listClass = `${style.list} ${theme === "dark" ? style["list--dark"] : ""}`;

    if (comments.length === 0) {
        return (
        <div className={theme === "dark" ? style.emptyDark : style.emptyLight}>
            <p className={style.emptyText}>К этому посту ещё нет комментариев</p>
            <p className={style.emptySubtext}>Будьте первым, кто оставит комментарий!</p>
        </div>
        );
    }

    const renderComments = useMemo(() => 
        comments.map(com => (
            <li key={com.id} className={style.item}>
                <CommentsCard {...com}/>
            </li>
        ))
    ,[theme, comments])

    return <ul className={listClass}>{renderComments}</ul>
    
})

export default CommentList