import { IPostCardProps } from "@/entities/post/lib";

export interface IPostListProps {
    theme: "light" | "dark";
    posts: IPostCardProps[];
    onPostClick?: (postId: number) => void;
}