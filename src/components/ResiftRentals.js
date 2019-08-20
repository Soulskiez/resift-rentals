import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from 'components/AppBar';
import Categories from 'components/Categories';
import MovieDrawer from 'components/MovieDrawer';
import MovieForm from 'components/MovieForm';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    flex: '0 0 auto',
  },
  categories: {
    flex: '1 1 auto',
  },
}));

function ResiftRentals() {
  const classes = useStyles();

  return (
    <>
      <MovieDrawer />
      <MovieForm />

      <div className={classes.root}>
        <AppBar className={classes.appBar} />
        <Categories className={classes.categories} />
      </div>
    </>
  );
}

export default ResiftRentals;
