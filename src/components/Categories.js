import React, { useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { useFetch, useDispatch } from 'resift';
import Category from 'components/Category';
import categoriesFetch from 'fetches/categoriesFetch';

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
  const dispatch = useDispatch();

  // TODO: use `status` to show a loader of some sort
  // eslint-disable-next-line
  const [categories, status] = useFetch(categoriesFetch);

  useEffect(() => {
    dispatch(categoriesFetch());
  }, [dispatch]);

  if (!categories) {
    return null;
  }

  return (
    <div className={classNames(classes.root, className)}>
      {categories.map(category => (
        <Category className={classes.category} key={category.id} id={category.id} />
      ))}
    </div>
  );
}

export default Categories;
