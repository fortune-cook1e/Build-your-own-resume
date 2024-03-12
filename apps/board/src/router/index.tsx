import Provider from '@/Provider';
import Board from '@/pages/Board';
import Builder from '@/pages/Builder/page';
import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from 'react-router-dom';

export const routes = createRoutesFromChildren(
  <Route element={<Provider />}>
    <Route path="resume-generator-board" element={<Board />}>
      <Route path="builder" element={<Builder />} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
