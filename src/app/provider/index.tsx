import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { DefaultPage, ErrorPage } from '@/page';

export const AppRouter = () => (
  <RouterRoutes>
    <Route path="/" element={<DefaultPage />} />
    <Route path="*" element={<ErrorPage />} />
  </RouterRoutes>
);