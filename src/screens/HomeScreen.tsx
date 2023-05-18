import {useMovies} from '../../hooks/useMovies';
import React from 'react';
import {ActivityIndicator, View, Dimensions} from 'react-native';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalSlider from '../components/HorizontalSlider';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  // const navigator = useNavigation();

  const { isLoading, nowPlaying, topRated ,popular , upcoming  } = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        <View style={{height: 440}}>
          <Carousel
            data={nowPlaying!}
            renderItem={({item}: any) => <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>

        {/* Peliculas populares */}
        <HorizontalSlider title='More Popular' movies={popular} />
        <HorizontalSlider title='Top Rated' movies={topRated} />
        <HorizontalSlider title='UpComing' movies={upcoming} />
      </View>
    </ScrollView>
  );
};
