import { useState, useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchPosts } from '@/app/store/reducers';
import { filterByLength } from '../PostLengthFilter';

export const useSortPost = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts.items);
  const postsStatus = useAppSelector(state => state.posts.status);
  const postsError = useAppSelector(state => state.posts.error);
  const commentsByPostId = useAppSelector(state => state.comments.byPostId);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

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
    handleSort,
    sortOrder,
    commentsByPostId
  };
};