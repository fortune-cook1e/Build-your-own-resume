import { Outlet } from 'react-router-dom';

const Board = () => {
  return (
    <div>
      <h1>this is board</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Board;
