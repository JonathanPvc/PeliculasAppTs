import React from 'react';
import {Text, View} from 'react-native';
import {Movie} from 'src/interfaces/movieInterface';
import { MoviePoster } from '../MoviePoster';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  title?: string;
  movies?: Movie[];
}

const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View style={{
      height: ( title ) ? 260 : 230, 
      }}>

      { 
       title && <Text style={{fontSize: 30, fontWeight: 'bold' , marginLeft : 10}}>{title}</Text>
      }

      <FlatList
        data={movies}
        renderItem={({item}: any) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalSlider;
