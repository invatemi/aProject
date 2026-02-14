import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumPhotos } from '@/app/store/reducers';
import { RootState, AppDispatch } from '@/app/store';

export const useAlbumPhotos = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const albumId = useMemo(() => {
    const num = Number(id);
    return isNaN(num) ? null : num;
  }, [id]);

  const { items: photos, status, error } = useSelector(
    (state: RootState) => state.photos
  );

  useEffect(() => {
    if (albumId !== null) {
      dispatch(fetchAlbumPhotos(albumId));
    }
  }, [albumId, dispatch]);

  return {
    photos,
    status,
    error,
    albumId,
    isLoading: status === 'loading',
    isEmpty: photos.length === 0 && status === 'succeeded'
  };
};