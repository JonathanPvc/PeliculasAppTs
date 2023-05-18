import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import { Movie } from 'src/interfaces/movieInterface';
import {RootStackParams} from 'src/navigation/Navigation';

import {useMovieDetails} from '../../hooks/useMovieDetails';
import {ActivityIndicator} from 'react-native';
import {MovieDetails} from '../components/MovieDetails/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
const screenHight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> {}

export const DetailsScreen = ({route , navigation}: Props) => {
  const movie = route.params;

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  console.log(movie.id);

  const {isLoading, movieFull, cast} = useMovieDetails(movie.id);

  console.log(cast);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.subTitle}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={35} color="grey" animating={isLoading} />
      ) : (
        <MovieDetails movieFull={movieFull} cast={cast} />
      )}

      <View style={ styles.backButton }>
        <TouchableOpacity>
          <Icon
            color={'white'}
            name="arrow-back-outline"
            size={60}
            style={styles.backButton}
            onPress={() => navigation.pop()}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    flex: 1,
  },
  imageContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: screenHight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,

    elevation: 9,
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
});
