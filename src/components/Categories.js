import React, { useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Loader from 'components/Loader';
import Category from 'components/Category';
import categoriesFetch from 'fetches/categoriesFetch';
import { useFetch, useDispatch } from 'resift';

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
  const dispatch = useDispatch();
  const classes = useStyles();

  const [categories, status] = useFetch(categoriesFetch);

  useEffect(() => {
    dispatch(categoriesFetch());
  }, [dispatch]);

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
