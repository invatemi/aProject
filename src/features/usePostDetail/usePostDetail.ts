import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/entities/post/api';
import { useGetCommentsByPostIdQuery } from '@/entities/comments/api';

export const usePostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const isValidId = !isNaN(postId) && postId > 0;

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useGetPostByIdQuery(postId, { skip: !isValidId });

  const {
    data: comments = [],
    isLoading: commentsLoading,
    error: commentsError,
  } = useGetCommentsByPostIdQuery(postId, { skip: !isValidId });

  return {
    post,
    postStatus: postLoading ? 'loading' : (post ? 'succeeded' : 'idle'),
    postError: postError ? (postError as any).message : null,
    comments,
    commentsStatus: commentsLoading ? 'loading' : (comments.length ? 'succeeded' : 'idle'),
    commentsError: commentsError ? (commentsError as any).message : null,
    postId,
    isValidId,
    isLoading: postLoading || commentsLoading,
    hasError: !!postError || !!commentsError,
    isEmpty: !post && !postLoading && !postError,
  };
};