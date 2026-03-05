import { FC, ReactNode } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/app/store/hooks';

interface WithLoadingProps {
  loadingSelector: (state: any) => boolean;
  children: ReactNode;
}

const BACKDROP_STYLES = {
  zIndex: (theme: any) => theme.zIndex.drawer + 1,
  color: '#fff',
};

const WithLoading: FC<WithLoadingProps> = ({ 
  loadingSelector, 
  children 
}) => {
  const isLoading = useAppSelector(loadingSelector);
  
  return (
    <>
      {children}
      <Backdrop open={isLoading} sx={BACKDROP_STYLES}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default WithLoading