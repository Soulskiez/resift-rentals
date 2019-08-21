import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useCurrentMovie from 'helpers/useCurrentMovie';
import useHistory from 'helpers/useHistory';
import Loader from 'components/Loader';
import { scale } from 'chroma-js';

const tomatoColor = scale(['#FF342C', '#70D44B']).domain([0, 100]);

const useStyles = makeStyles(theme => ({
  root: {},
  loader: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    flex: '1 0 auto',
  },
  headerRow: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(2),
  },
  name: {
    ...theme.typography.h4,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  poster: {
    width: 130,
    height: 193,
    marginLeft: 'auto',
  },
  actors: {
    flex: '0 0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  actor: {
    flex: '0 0 auto',
    marginBottom: theme.spacing(1),
  },
  tomatometer: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: theme.spacing(1),
  },
  tomatometerLabel: {
    ...theme.typography.h3,
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
  tomatometerText: {
    ...theme.typography.h3,
    fontWeight: 'bold',
    flex: '0 0 auto',
    display: 'flex',
  },
  block: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
  },
  blockLabel: {
    ...theme.typography.h5,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  description: {
    ...theme.typography.body1,
  },
  trailer: {
    width: '100% !important',
    height: 'auto !important',
  },
  rating: {
    border: `1px solid ${theme.palette.common.white}`,
    padding: theme.spacing(1),
    alignSelf: 'flex-start',
  },
  button: {
    alignSelf: 'flex-start',
  },
}));

function MovieDrawer() {
  const current = useCurrentMovie();
  const history = useHistory();
  const classes = useStyles();

  const handleClose = () => {
    history.push('/');
  };

  const { status, movie, open } = current;

  return (
    <Drawer open={open} onClose={handleClose} anchor="right">
      <Loader className={classes.loader} status={status}>
        {() => {
          const {
            name,
            posterUrl,
            actors,
            tomatoScore,
            synopsis,
            trailerUrl,
            mpaaRating,
            id,
          } = movie;

          return (
            <>
              <div className={classes.headerRow}>
                <div className={classes.headerContent}>
                  <div className={classes.name}>{name}</div>
                  <div className={classes.actors}>
                    {actors.map(actor => (
                      <span className={classes.actor}>{actor}</span>
                    ))}
                  </div>
                  <div className={classes.tomatometer}>
                    <div className={classes.tomatometerLabel}>
                      <span role="img" aria-label="Tomatometer">
                        {tomatoScore >= 50 ? '🍅' : '🤮'}
                      </span>
                    </div>
                    <div
                      className={classes.tomatometerText}
                      style={{ color: tomatoColor(tomatoScore) }}
                    >
                      {tomatoScore}%
                    </div>
                  </div>
                  <div className={classes.rating}>{mpaaRating}</div>
                </div>
                <div
                  className={classes.poster}
                  style={{
                    background: `url(${posterUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
              </div>

              <div className={classes.block}>
                <div className={classes.blockLabel}>Synopsis</div>
                <div
                  className={classes.description}
                  dangerouslySetInnerHTML={{ __html: synopsis }}
                />
              </div>

              <div className={classes.block}>
                <div className={classes.blockLabel}>Trailer</div>
                <video className={classes.trailer} controls>
                  <source src={trailerUrl} type="video/mp4" />
                </video>
              </div>
              <Button className={classes.button} component={Link} to={`/movies/${id}/edit`}>
                Edit
              </Button>
            </>
          );
        }}
      </Loader>
    </Drawer>
  );
}

export default MovieDrawer;
