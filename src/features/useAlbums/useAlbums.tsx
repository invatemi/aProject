import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchAlbums } from '@/app/store/reducers';

export const useAlbums = () => {
  const dispatch = useAppDispatch();
  const { items: albums, status, error } = useAppSelector((state) => state.albums);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAlbums());
    }
  }, [dispatch, status]);

  return {
    albums,
    isLoading: status === 'loading',
    error: error || null,
    isEmpty: albums.length === 0 && status === 'succeeded'
  };
};