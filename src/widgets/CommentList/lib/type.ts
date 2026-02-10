import { IComppentsProps } from "@/entities/comments/lib";

export interface ICommentListProps {
    theme? : "light" | "dark",
    comments : IComppentsProps[]
}