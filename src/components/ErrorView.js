import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.common.white,
  },
  title: {
    ...theme.typography.h4,
    fontWeight: 'bold',
  },
  subtitle: {
    ...theme.typography.body2,
  },
}));

function ErrorView({ className }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.title}>Oh no!</div>
      <div className={classes.subtitle}>An error occurred.</div>
    </div>
  );
}

ErrorView.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ErrorView;
