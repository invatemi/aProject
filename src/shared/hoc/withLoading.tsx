import { Backdrop, CircularProgress } from '@mui/material';
import { ComponentType, useState } from 'react';

export interface WithLoadingProps {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T | undefined>;
}

const withLoading = <P extends object>( WrappedComponent: ComponentType<P & WithLoadingProps> ): ComponentType<P> => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    const withLoadingHandler = async <T,>(asyncFn: () => Promise<T>): Promise<T | undefined> => {
    try {
        startLoading();
        return await asyncFn();
      } catch (error) {
        console.error('Error in withLoading:', error);
        return undefined;
      } finally {
        stopLoading();
      }
    };

    return (
      <>
        <WrappedComponent
          {...props}
          isLoading={isLoading}
          startLoading={startLoading}
          stopLoading={stopLoading}
          withLoading={withLoadingHandler}
        />
        <Backdrop
          open={isLoading}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            color: '#fff',
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  };
};

export default withLoading;