import { useMovies } from '../../hooks/useMovies';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const HomeScreen = () => {

  // const navigator = useNavigation();

  const { peliculasEnCine , isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  if ( isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator color="red" size={100} />
      </View>
    )
  }



  return (
    <View style = {{ marginTop : top + 20}}>
     <MoviePoster movie={ peliculasEnCine [1]} />
    </View>
  );
};
