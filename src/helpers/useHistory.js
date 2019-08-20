import { useContext } from 'react';
import { RouterContext } from 'helpers/RouterProvider';

function useHistory() {
  const { history } = useContext(RouterContext);
  return history;
}

export default useHistory;
