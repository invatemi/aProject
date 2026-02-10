import { z } from "zod";
import { PostsArraySchema, CommentsArraySchema, Post, Comment } from "../types";

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_API_URL = "https://jsonplaceholder.typicode.com/comments";

const handleZodError = (error: unknown): never => {
  if (error instanceof z.ZodError) {
    const issues = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ');
    throw new Error(`Ошибка валидации данных: ${issues}`);
  }
  throw error instanceof Error ? error : new Error(String(error));
};

export const fetchPostsAPI = async (): Promise<Post[]> => {
  try {
    const response = await fetch(POSTS_API_URL);
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки постов: ${response.status} ${response.statusText}`);
    }
    
    const rawData = await response.json();
    return PostsArraySchema.parse(rawData);
  } catch (error) {
    console.error("fetchPostsAPI error:", error);
    handleZodError(error);
    throw error instanceof Error ? error : new Error("Неизвестная ошибка при загрузке постов");
  }
};

export const fetchCommentsAPI = async (postId: number): Promise<Comment[]> => {
  try {
    const url = `${COMMENTS_API_URL}?postId=${postId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки комментариев: ${response.status} ${response.statusText}`);
    }
    
    const rawData = await response.json();
    return CommentsArraySchema.parse(rawData);
  } catch (error) {
    console.error(`fetchCommentsAPI (post ${postId}) error:`, error);
    handleZodError(error);
    throw error instanceof Error 
      ? error 
      : new Error(`Неизвестная ошибка при загрузке комментариев для поста ${postId}`);
  }
};