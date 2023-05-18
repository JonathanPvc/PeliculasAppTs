import { Cast, CreditsResponse } from 'src/interfaces/creditsInterface';
import movieDB from '../src/api/movieDB';
import {  MovieFull } from '../src/interfaces/movieInterface';
import { useEffect, useState } from 'react';
interface MovieDetails {
    cast: Cast[];
    isLoading: boolean;
    movieFull?: MovieFull;
}


export const useMovieDetails = ( movieId : number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []

    }); 

    const getMovieDetails = async ( ) => {

        const movieDetailsPromise = movieDB.get<MovieFull>(`/${ movieId }`);
        const movieCastPromise = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);

       const [moviesDetailResp , castPromiseResp ] = await Promise.all([ movieDetailsPromise, movieCastPromise ])

     setState({
            isLoading: false,
            movieFull: moviesDetailResp.data, 
            cast: castPromiseResp.data.cast
        })


    }

    useEffect (() => {
        getMovieDetails();

    },[]);


    return {
        ...state

    }




}