import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { useFetch, useDispatch } from 'resift';
import MoviePreview from 'components/MoviePreview';
import makeCategoryFetch from 'fetches/makeCategoryFetch';

const threshold = 32;

const useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 3),
    color: theme.palette.common.white,
  },
  name: {
    ...theme.typography.h6,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  movies: {
    display: 'flex',
    overflow: 'auto',
    margin: theme.spacing(0, -3),
    alignItems: 'center',
  },
  moviePreview: {
    flex: '0 0 auto',
    marginRight: theme.spacing(1),
  },
}));

function Category({ id, className }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const scrollAnchorRef = useRef(null);
  const [hitScrollEnd, setHitScrollEnd] = useState(false);
  const categoryFetch = makeCategoryFetch(id);

  // TODO: use `status` to show a loader of some sort
  // eslint-disable-next-line
  const [category, status] = useFetch(categoryFetch);

  useEffect(() => {
    dispatch(categoryFetch());
  }, [categoryFetch, dispatch]);

  useEffect(() => {
    if (!hitScrollEnd) return;
    if (!category) return;

    const { page, total, pageSize } = category.movies.pagination;
    if (page * pageSize > total) return;

    dispatch(categoryFetch(page + 1));
  }, [hitScrollEnd, dispatch, categoryFetch, category]);

  const handleScroll = () => {
    const scrollAnchor = scrollAnchorRef.current;
    if (!scrollAnchor) return;

    const { left } = scrollAnchor.getBoundingClientRect();
    const { width } = document.body.getBoundingClientRect();
    setHitScrollEnd(width - left + threshold > 0);
  };

  if (!category) {
    return null;
  }

  const { name, movies } = category;

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.name}>{name}</div>
      <div className={classes.movies} onScroll={handleScroll}>
        {movies.results.map(movie => (
          <MoviePreview key={movie.id} className={classes.moviePreview} {...movie} />
        ))}
        <div className={classes.scrollAnchor} ref={scrollAnchorRef} />
      </div>
    </div>
  );
}

Category.propTypes = {
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Category;
