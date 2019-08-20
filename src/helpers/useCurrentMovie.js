import { useEffect } from 'react';
import useLocation from 'helpers/useLocation';
import makeMovieFetch from 'fetches/makeMovieFetch';
import { useFetch, useDispatch, isNormal } from 'resift';
import get from 'lodash/get';

function useCurrentMovie() {
  const { match } = useLocation('/movies/:id');
  const { match: editMatch } = useLocation('/movies/:id/edit');
  const dispatch = useDispatch();

  const id = get(match, ['params', 'id']);
  const movieFetch = id && makeMovieFetch(id);
  const [movie, status] = useFetch(movieFetch);

  useEffect(() => {
    // early return if there is no fetch yet
    if (!movieFetch) {
      return;
    }

    // early return if there is already data associated with this fetch
    if (isNormal(status)) {
      return;
    }

    dispatch(movieFetch());
  }, [status, movieFetch, dispatch]);

  return { movie, status, open: !!match, id, editing: !!editMatch };
}

export default useCurrentMovie;
