import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#141414',
    padding: theme.spacing(2),
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  logo: {
    ...theme.typography.h6,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(5),
    transition: theme.transitions.create('all'),
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  fakeLinks: {
    display: 'flex',
    marginRight: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  fakeLink: {
    transition: theme.transitions.create('all'),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:active': {
      color: theme.palette.primary.main,
    },
  },
  controls: {
    marginLeft: 'auto',
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
}));

function AppBar({ className }) {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.logo}>ReSift Rentals</div>
      <div className={classes.fakeLinks}>
        <div className={classes.fakeLink}>Home</div>
        <div className={classes.fakeLink}>TV Shows</div>
        <div className={classes.fakeLink}>Movies</div>
        <div className={classes.fakeLink}>Recently Added</div>
        <div className={classes.fakeLink}>My List</div>
      </div>
      <div className={classes.controls}>
        <SearchIcon />
        <NotificationsIcon />
      </div>
    </div>
  );
}

AppBar.propTypes = {
  className: PropTypes.string,
};

export default AppBar;
