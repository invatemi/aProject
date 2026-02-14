import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchComments } from '@/app/store/reducers';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';


export const usePostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  
  const postId = Number(id);
  const isValidId = !isNaN(postId) && postId > 0;

  const { currentPost, currentPostStatus, currentPostError } = useAppSelector(
    (state) => state.posts
  );

  const commentsState = useAppSelector((state) => state.comments);
  const comments = commentsState.byPostId[postId] || [];
  const commentsStatus = commentsState.status[postId] || 'idle';
  const commentsError = commentsState.error[postId] || null;

  useEffect(() => {
    if (isValidId) {
      dispatch(fetchPostById(postId));
      dispatch(fetchComments(postId));
    }
    return () => {
      dispatch({ type: 'posts/clearCurrentPost' });
    };
  }, [postId, isValidId, dispatch]);

  return {
    post: currentPost,
    postStatus: currentPostStatus,
    postError: currentPostError,
    comments,
    commentsStatus,
    commentsError,
    postId,
    isValidId,
    isLoading: currentPostStatus === 'loading' || commentsStatus === 'loading',
    hasError: !!currentPostError || !!commentsError,
    isEmpty: 
      currentPostStatus === 'succeeded' && 
      currentPost === null &&
      !currentPostError
  };
};