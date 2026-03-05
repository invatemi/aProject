import { useState, useCallback, useMemo } from 'react';
import { filterByLength } from '../PostLengthFilter';
import { Comment } from '@/entities/comments/lib';
import { useGetPostsQuery } from '@/entities/post/api';
import { useGetAllCommentsQuery } from '@/entities/comments/api';

export const useSortPost = () => {
  const { data: posts = [], isLoading: postsLoading, error: postsError } = useGetPostsQuery();
  const { data: allComments = [], isLoading: commentsLoading } = useGetAllCommentsQuery();

  const commentsByPostId = useMemo(() => {
    const map: Record<number, Comment[]> = {};
    allComments.forEach((comment) => {
      if (!map[comment.postId]) map[comment.postId] = [];
      map[comment.postId].push(comment);
    });
    return map;
  }, [allComments]);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const sortedPosts = useMemo(() => {
    if (!sortOrder) return posts;
    return filterByLength(posts, sortOrder);
  }, [posts, sortOrder]);

  const handleSort = useCallback((order: 'asc' | 'desc' | null) => {
    setSortOrder(order);
  }, []);

  return {
    posts,
    postsError: postsError ? (postsError as any).message : null,
    sortedPosts,
    handleSort,
    sortOrder,
    commentsByPostId,
  };
};