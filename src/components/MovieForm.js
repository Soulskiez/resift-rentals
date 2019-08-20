import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'resift';
import { useSnackbar } from 'notistack';
import get from 'lodash/get';
import Loader from 'components/Loader';
import useHistory from 'helpers/useHistory';
import useCurrentMovie from 'helpers/useCurrentMovie';
import makeUpdateMovieFetch from 'fetches/makeUpdateMovieFetch';

const useStyles = makeStyles(theme => ({
  root: {},
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

function MovieForm() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { editing, movie, status, id } = useCurrentMovie();

  const updateMovieFetch = id && makeUpdateMovieFetch(id);

  const handleClose = () => {
    history.push(`/movies/${id}`);
  };

  const [synopsis, setSynopsis] = useState(get(movie, ['synopsis'], ''));

  useEffect(() => {
    if (!movie) return;

    setSynopsis(movie.synopsis);
  }, [movie]);

  const handleSynopsisChange = e => {
    setSynopsis(e.currentTarget.value);
  };
  const handleSave = async () => {
    const updatedMovie = { synopsis };
    if (!updateMovieFetch) return;

    await dispatch(updateMovieFetch(updatedMovie));
    history.push(`/movies/${id}`);
    enqueueSnackbar('Updated movie!', { variant: 'success' });
  };

  return (
    <Dialog open={editing} onClose={handleClose} maxWidth="sm" fullWidth>
      <Loader status={status}>
        {() => {
          return (
            <>
              <DialogTitle>Edit this movie</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <TextField
                  value={synopsis}
                  label="Synopsis"
                  variant="outlined"
                  onChange={handleSynopsisChange}
                  multiline
                  rows={15}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Loader>
    </Dialog>
  );
}

export default MovieForm;
