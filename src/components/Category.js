import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import range from 'lodash/range';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { isNormal } from 'resift';
import MoviePreview from 'components/MoviePreview';
import Loader from 'components/Loader';
import { transparentize } from 'polished';

const threshold = 32;
const width = 288;
const height = 162;

const useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 3),
    color: theme.palette.common.white,
    minHeight: height,
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
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  moviePreview: {
    flex: '0 0 auto',
    marginRight: theme.spacing(1),
  },
  skeletonLoader: {
    height,
    width: '100%',
    display: 'flex',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  skeletonMovie: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    backgroundColor: transparentize(0.8, theme.palette.common.black),
    height,
    width,
  },
}));

function Category({ id, className }) {
  const classes = useStyles();
  const scrollAnchorRef = useRef(null);
  const [hitScrollEnd, setHitScrollEnd] = useState(false);

  // ???
  const category = {};
  const status = 0;
  const dispatch = () => {};

  const handleScroll = () => {
    const scrollAnchor = scrollAnchorRef.current;
    if (!scrollAnchor) return;

    const { left } = scrollAnchor.getBoundingClientRect();
    const { width } = document.body.getBoundingClientRect();
    setHitScrollEnd(width - left + threshold > 0);
  };

  const categoryRef = useRef(category);
  useLayoutEffect(() => {
    categoryRef.current = category;
  }, [category]);

  useEffect(() => {
    const category = categoryRef.current;
    if (!hitScrollEnd) return;
    if (!category) return;

    const { page, total, pageSize } = category.movies.pagination;
    if (page * pageSize > total) return;

    // dispatch(categoryFetch(page + 1)).then(() => {
    //   handleScroll();
    // });
  }, [hitScrollEnd, dispatch]);

  return null;

  return (
    <Loader
      className={classNames(classes.root, className)}
      status={status}
      isLoadingView={
        isNormal(status) ? (
          <CircularProgress />
        ) : (
          <div className={classes.skeletonLoader}>
            {range(10).map(i => (
              <div className={classes.skeletonMovie} />
            ))}
          </div>
        )
      }
    >
      {() => {
        const { name, movies } = category;

        return (
          <>
            <div className={classes.name}>{name}</div>
            <div className={classes.movies} onScroll={handleScroll}>
              {movies.results.map(movie => (
                <MoviePreview key={movie.id} className={classes.moviePreview} {...movie} />
              ))}
              <div className={classes.scrollAnchor} ref={scrollAnchorRef} />
            </div>
          </>
        );
      }}
    </Loader>
  );
}

Category.propTypes = {
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Category;
