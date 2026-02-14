import { useNavigate } from 'react-router-dom';

export const useUserNavigation = () => {
  const navigate = useNavigate();
  
  const handleUserClick = (userId: number) => {
    if (userId && !isNaN(userId)) {
      navigate(`/users/${userId}/posts`);
    }
  };
  
  return { handleUserClick };
};