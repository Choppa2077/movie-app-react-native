import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchingTopRatedMovies,
  fetchingTrendingMovies,
  fetchingUpcomingMovies,
} from '../api/moviedb';

const android = Platform.OS === 'android';

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchingTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
    // console.log('trend goat: ', data.results);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchingUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchingTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    // console.log('trend goat: ', data.results);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={android ? 'mb-3' : '-mb-2'}>
        <StatusBar barStyle={'light-content'} />
        <View
          className="flex-row justify-between items-center mx-4
        "
        >
          <Bars3CenterLeftIcon size={30} color={'white'} strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon color="white" size={30} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies */}
          {/* {trending.length > 0 &&   <TrendingMovies data={trending} />} */}
          <TrendingMovies data={trending} />

          {/* Upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />

          {/* top rated movies row */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
