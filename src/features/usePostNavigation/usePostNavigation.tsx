import { useNavigate } from 'react-router-dom';

export const usePostNavigation = () => {
  const navigate = useNavigate();
  
  const handlePostClick = (postId: number) => {
    if (postId && !isNaN(postId)) {
      navigate(`/posts/${postId}`);
    }
  };
  
  return { handlePostClick };
};