import Provider from '@/Provider';
import Board from '@/pages/Board/page';
import Builder from '@/pages/Builder/page';
import Preview from '@/pages/Preview/page';
import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from 'react-router-dom';

export const routes = createRoutesFromChildren(
  <Route element={<Provider />}>
    <Route path="resume-generator-board" element={<Board />}>
      <Route path="builder" element={<Builder />} />
      <Route path="preview" element={<Preview />} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
