import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from './AppBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#141414',
  },
  appBar: {},
}));

function ResiftRentals() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} />
    </div>
  );
}

export default ResiftRentals;
