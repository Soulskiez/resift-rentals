import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const RouterContext = createContext(null);

function RouterProvider({ children }) {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unsubscribe = history.listen(location => {
      setLocation(location);
    });

    return unsubscribe;
  }, []);

  const contextValue = useMemo(() => ({ location, history }), [location]);

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
}

RouterProvider.propTypes = {
  children: PropTypes.node,
};

export default RouterProvider;
