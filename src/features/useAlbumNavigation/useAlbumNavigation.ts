import { useNavigate } from 'react-router-dom';

export const useAlbumNavigation = () => {
  const navigate = useNavigate();
  
  const handleAlbumClick = (albumId: number) => {
    if (albumId && !isNaN(albumId)) {
      navigate(`/albums/${albumId}/photos`);
    }
  };
  
  return { handleAlbumClick };
};