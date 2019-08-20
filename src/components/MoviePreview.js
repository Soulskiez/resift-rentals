import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { transparentize } from 'polished';

const width = 288;
const height = 162;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: theme.palette.common.white,
    width,
    height,
    transition: theme.transitions.create('all'),
    cursor: 'pointer',
    '&:hover': {
      width: 1.5 * width,
      height: 1.2 * height,
      border: `3px solid ${transparentize(0.5, 'white')}`,
    },
    '&:active': {
      border: '3px solid white',
    },
  },
  name: {
    ...theme.typography.body1,
    fontWeight: 'bold',
    margin: theme.spacing(1, 2),
    zIndex: 1,
  },
  backdrop: {
    height: 64,
    width: '100%',
    position: 'absolute',
    background: `linear-gradient(${transparentize(1, 'black')}, black)`,
  },
}));

function MoviePreview({ className, id, name, imageUrl }) {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, className, {})}
      style={{
        background: `url(${imageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className={classes.backdrop} />
      <div className={classes.name}>{name}</div>
    </div>
  );
}

MoviePreview.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default MoviePreview;
