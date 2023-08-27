import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

const MovieScreen = () => {
  const { params: item } = useRoute();
  const [isFavourite, setFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState({});
  useEffect(() => {
    //call the movie details api
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    // console.log('itemid: ', item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log('got movie DEATAILS:', data);
    if (data) setMovies(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    // console.log('GOAT credits: ', data);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    // console.log('GOAT similar movies: ', data);
  };

  const toggleFavour = () => {
    setFavourite(!isFavourite);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 48 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster*/}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4 ' +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavour}>
            <HeartIcon size={35} color={!isFavourite ? 'white' : 'red'} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movies.poster_path) }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23,23,23, 0.8)',
                'rgba(23,23,23,1)',
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movies.original_title}
        </Text>
        {/*statusm release, runtime */}
        {movies?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movies?.status} • {movies?.release_date.split('-')[0]} •{' '}
            {movies?.runtime}
          </Text>
        ) : null}
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movies?.genres?.map((genre, index) => {
            let showDot = index + 1 != movies.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? '•' : null}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movies?.overview}
        </Text>
      </View>
      {/* cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title={'Similar Movies'}
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
