import React from 'react';
import {View, Text} from 'react-native';
import {Movie} from 'src/interfaces/movieInterface';

interface Props {
  movie: Movie;
}
export const MoviePoster = ( {movie} : Props) => {

    console.log(movie);
    
  return (
    <View>
      <Text> { movie.title }</Text>
    </View>
  );
};
