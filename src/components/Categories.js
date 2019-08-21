import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Loader from 'components/Loader';
import Category from 'components/Category';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(3, 0),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(5),
    },
  },
  category: {},
}));

function Categories({ className }) {
  const classes = useStyles();

  // ???
  const categories = {};

  return null;

  const status = 0;

  return (
    <Loader status={status} className={classNames(classes.root, className)}>
      {() => (
        <>
          {categories.map((category, i) => (
            <Category className={classes.category} key={`${category.id}-${i}`} id={category.id} />
          ))}
        </>
      )}
    </Loader>
  );
}

export default Categories;
