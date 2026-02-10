import { useState, useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchPosts } from '@/app/store/posts';
import { fetchComments } from '@/app/store/comments';
import { filterByLength } from '../PostLengthFilter';

export const useDefaultPageLogic = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts.items);
  const postsStatus = useAppSelector(state => state.posts.status);
  const postsError = useAppSelector(state => state.posts.error);
  const commentsByPostId = useAppSelector(state => state.comments.byPostId);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  const handlePostClick = useCallback((postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      return;
    }
    setSelectedPostId(postId);
    if (!commentsByPostId[postId]) {
      dispatch(fetchComments(postId));
    }
  }, [selectedPostId, commentsByPostId, dispatch]);

  const sortedPosts = useMemo(() => {
    if (!sortOrder) return posts;
    return filterByLength(posts, sortOrder);
  }, [posts, sortOrder]);

  const handleSort = useCallback((order: "asc" | "desc" | null) => {
    setSortOrder(order);
  }, []);

  return {
    posts,
    postsError,
    sortedPosts,
    selectedPostId,
    handlePostClick,
    handleSort,
    sortOrder,
    commentsByPostId
  };
};