import {useEffect, useState} from 'react';
import movieDB from '../src/api/movieDB';
import {MovieDBMoviesResponse, Movie} from '../src/interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    try {
      const nowPlayingPromise =
        movieDB.get<MovieDBMoviesResponse>('/now_playing');
      const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
      const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
      const upComingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

      const response = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upComingPromise,
      ]);

      setMoviesState({
        nowPlaying: response[0].data.results,
        popular: response[1].data.results,
        topRated: response[2].data.results,
        upcoming: response[3].data.results,
      });
    } catch (error) {
      // Manejar el error aquí, por ejemplo:
      console.error('Error al obtener las películas:', error);
      // También puedes actualizar el estado con un valor de error específico si lo deseas
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
