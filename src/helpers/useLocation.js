import { RouterContext } from 'helpers/RouterProvider';
import { useContext } from 'react';
import { matchPath } from 'react-router';

function useLocation(matchParams) {
  const { location } = useContext(RouterContext);
  const match = matchParams ? matchPath(location.pathname, matchParams) : null;

  return { location, match };
}

export default useLocation;
