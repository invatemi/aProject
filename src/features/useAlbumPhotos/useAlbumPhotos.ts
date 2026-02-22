import { useParams } from 'react-router-dom';
import { useGetPhotosByAlbumIdQuery } from '@/entities/photo/api';

export const useAlbumPhotos = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const isValid = !isNaN(albumId) && albumId > 0;

  const { data: photos = [], isLoading, error } = useGetPhotosByAlbumIdQuery(albumId, {
    skip: !isValid,
  });

  return {
    photos,
    isLoading,
    error: error ? (error as any).message || 'Ошибка загрузки' : null,
    albumId: isValid ? albumId : null,
    isEmpty: photos.length === 0 && !isLoading && !error,
  };
};