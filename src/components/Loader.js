import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';
import ErrorView from 'components/ErrorView';
import { isNormal, isLoading, isError } from 'resift';
import { transparentize } from 'polished';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: transparentize(0.8, theme.palette.common.white),
  },
}));

function Loader({
  status,
  children,
  className,
  loadingView = <CircularProgress />,
  errorView = <ErrorView />,
}) {
  const classes = useStyles();

  const stateView = (() => {
    if (isLoading(status)) {
      return loadingView;
    }

    if (isError(status)) {
      return errorView;
    }

    return null;
  })();

  return (
    <div className={classNames(classes.root, className)}>
      {stateView && <div className={classes.overlay}>{stateView}</div>}
      {isNormal(status) && children()}
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
  status: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
  loadingView: PropTypes.node,
  errorView: PropTypes.node,
};

export default Loader;
